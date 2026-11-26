#!/usr/bin/env python3
"""Importa publicações de um currículo Lattes (XML) para o formato de data.js.

O Lattes protege a página pública com captcha, então o caminho suportado é:
  1. Abra o currículo -> "Exportar" / baixe o XML (ou o ZIP com o XML).
  2. python tools/lattes_import.py curriculo.xml eduardo > novas.js
  3. Cole os objetos gerados em PUBLICATIONS (data.js) e ajuste `lines`.
"""
import json, sys, zipfile, xml.etree.ElementTree as ET

def load(path):
    if path.endswith(".zip"):
        with zipfile.ZipFile(path) as z:
            return ET.fromstring(z.read(next(n for n in z.namelist() if n.endswith(".xml"))))
    return ET.parse(path).getroot()

def authors(node):
    return "; ".join(a.get("NOME-PARA-CITACAO", "") for a in node.findall("AUTORES"))

def main(path, person_id):
    root, out = load(path), []
    for art in root.iter("ARTIGO-PUBLICADO"):
        b, d = art.find("DADOS-BASICOS-DO-ARTIGO"), art.find("DETALHAMENTO-DO-ARTIGO")
        out.append(dict(year=int(b.get("ANO-DO-ARTIGO") or 0), type="journal", title=b.get("TITULO-DO-ARTIGO"),
                        authorsText=authors(art), venue=d.get("TITULO-DO-PERIODICO-OU-REVISTA"), authors=[person_id],
                        lines=[], tag="", url=("https://doi.org/" + b.get("DOI")) if b.get("DOI") else ""))
    for ev in root.iter("TRABALHO-EM-EVENTOS"):
        b, d = ev.find("DADOS-BASICOS-DO-TRABALHO"), ev.find("DETALHAMENTO-DO-TRABALHO")
        out.append(dict(year=int(b.get("ANO-DO-TRABALHO") or 0), type="conference", title=b.get("TITULO-DO-TRABALHO"),
                        authorsText=authors(ev), venue=d.get("NOME-DO-EVENTO"), authors=[person_id],
                        lines=[], tag="", url=("https://doi.org/" + b.get("DOI")) if b.get("DOI") else ""))
    print(",\n".join("  " + json.dumps(o, ensure_ascii=False) for o in sorted(out, key=lambda o: -o["year"])))

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(*sys.argv[1:])
