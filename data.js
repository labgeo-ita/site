/* =====================================================================
   LabGeo-ITA — base de dados do site
   Edite este arquivo para atualizar pesquisadores, linhas, projetos e
   publicações. A interface (app.js) é gerada a partir daqui.

   Vínculos (researchers[].lines / .projects e publications[].authors /
   .lines) foram INFERIDOS a partir das áreas de interesse e dos títulos.
   Revise e ajuste livremente.

   Lattes: para importar automaticamente, veja tools/lattes_import.py
   (o Lattes exige captcha, então o XML do currículo é baixado manualmente).
   ===================================================================== */

const TBD = { pt: "A preencher", en: "To be filled in" };

/* ---------- Linhas de pesquisa ---------- */
const LINES = [
  { id: "l1", img: "aeroporto.jpg", icon: "fa-plane-up",
    tag: { pt: "ENGENHARIA", en: "ENGINEERING" },
    title: { pt: "Sensoriamento Remoto Aplicado à Infraestrutura e Transportes", en: "Remote Sensing Applied to Infrastructure and Transport" },
    desc: { pt: "Métodos e aplicações de SR óptico, SAR e LiDAR para diagnóstico, monitoramento e planejamento de infraestruturas críticas, com ênfase em aeroportos, transporte aéreo e sistemas urbanos.",
            en: "Methods and applications of optical RS, SAR, and LiDAR for diagnosis, monitoring, and planning of critical infrastructure, with emphasis on airports, air transport, and urban systems." } },
  { id: "l2", img: "tunel.jpg", icon: "fa-satellite-dish",
    tag: { pt: "ENGENHARIA", en: "ENGINEERING" },
    title: { pt: "Geodinâmica, Geotecnia e Monitoramento de Deformações do Terreno", en: "Geodynamics, Geotechnics, and Terrain Deformation Monitoring" },
    desc: { pt: "Interferometria SAR e dados de alta resolução para análise de subsidência, recalques e impactos geotécnicos associados a obras de infraestrutura urbana e subterrânea.",
            en: "InSAR and high-resolution data for analyzing subsidence, settlement, and geotechnical impacts associated with urban and underground infrastructure works." } },
  { id: "l3", img: "painel_3.png", icon: "fa-water",
    tag: { pt: "SENSORIAMENTO REMOTO", en: "REMOTE SENSING" },
    title: { pt: "Desastres, Hidrologia e Resiliência", en: "Disasters, Hydrology, and Resilience" },
    desc: { pt: "Desenvolvimento de modelos e mapeamentos geoespaciais para avaliação de risco, vulnerabilidade e resiliência de sistemas socioambientais e infraestruturas frente a eventos extremos.",
            en: "Development of geospatial models and mapping for risk assessment, vulnerability, and resilience of socio-environmental systems and infrastructure against extreme events." } },
  { id: "l4", img: "ecologia.jpg", icon: "fa-feather-pointed",
    tag: { pt: "ECOLOGIA", en: "ECOLOGY" },
    title: { pt: "Ecologia Espacial e Interações Fauna–Infraestrutura", en: "Spatial Ecology and Fauna–Infrastructure Interactions" },
    desc: { pt: "Aplicação de geotecnologias para o estudo de sistemas ecológicos, grandes animais e interações críticas entre fauna, clima e infraestrutura, incluindo segurança operacional aeroportuária.",
            en: "Application of geotechnologies to study ecological systems, large animals, and critical interactions between fauna, climate, and infrastructure, including airport operational safety." } },
  { id: "l5", img: "simulacao.jpg", icon: "fa-diagram-project",
    tag: { pt: "SIMULAÇÃO", en: "SIMULATION" },
    title: { pt: "Modelagem Geoespacial, Sistemas Complexos e Tomada de Decisão", en: "Geospatial Modeling, Complex Systems, and Decision Making" },
    desc: { pt: "Integração de geoprocessamento, estatística, análise multicritério e teoria de sistemas complexos adaptativos para suporte à decisão em engenharia, ecologia e planejamento territorial.",
            en: "Integration of geoprocessing, statistics, multi-criteria analysis, and complex adaptive systems theory for decision support in engineering, ecology, and territorial planning." } },
  { id: "l6", img: "glaciologia.jpg", icon: "fa-snowflake",
    tag: { pt: "GLACIOLOGIA", en: "GLACIOLOGY" },
    title: { pt: "Glaciologia e Criosfera", en: "Glaciology and Cryosphere" },
    desc: { pt: "Estudo de geleiras, mantos de gelo e processos da criosfera por meio de sensoriamento remoto, modelagem e fusão de dados. (Texto genérico — a preencher.)",
            en: "Study of glaciers, ice sheets and cryospheric processes through remote sensing, modelling and data fusion. (Generic text — to be filled in.)" } },
];

/* ---------- Projetos ---------- */
const PROJECTS = [
  { id: "mesaa", name: "MESA-A (Automatiza)", status: "ongoing", period: { pt: "2025 - Atual", en: "2025 - Present" }, lines: ["l1", "l5"],
    desc: { pt: "Metodologia de Escolha de Sítios Aeroportuários - Automatização e aprimoramento de processos de seleção com ferramentas geoespaciais.",
            en: "Methodology for Airport Site Selection - Automation and improvement of selection processes with geospatial tools." } },
  { id: "lessonia", name: "LESSONIA", status: "ongoing", period: { pt: "2023 - Atual", en: "2023 - Present" }, lines: ["l1", "l2"],
    desc: { pt: "O projeto LESSONIA, fruto de uma parceria de transferência tecnológica com a ICEYE, utiliza sensores SAR de banda-X para o monitoramento de infraestruturas críticas no Brasil.",
            en: "The LESSONIA project, a technology-transfer partnership with ICEYE, uses X-band SAR sensors for monitoring critical infrastructure in Brazil." } },
  { id: "mesa", name: "MESA (SAC)", status: "finished", period: "2019 - 2023", lines: ["l5", "l1"],
    desc: { pt: "Desenvolvimento da metodologia base para seleção de novos sítios aeroportuários regionais no Brasil.",
            en: "Development of the base methodology for selecting new regional airport sites in Brazil." } },
  { id: "elos", name: "ELOS (FAPESP)", status: "finished", period: "2019 - 2023", lines: ["l4", "l5"],
    desc: { pt: "Este projeto investiga as lacunas técnicas e sociais dos programas de Pagamento por Serviços Ambientais (PSA).",
            en: "This project investigates the technical and social gaps in Payment for Ecosystem Services (PES) programs." } },
];

/* ---------- Pessoas ----------
   group: leader | researcher | student | tech
   lattes: ID de 16 dígitos do currículo Lattes                        */
const PEOPLE = [
  { id: "eduardo", group: "leader", name: "Dr. Eduardo Moraes Arraut", short: "Eduardo Arraut", photo: "eduardo.jpg", lattes: "6644520104732336",
    role: { pt: "Líder do Laboratório & Professor", en: "Head of Laboratory & Professor" },
    bio: { pt: "<strong>Formação & Atuação:</strong> Professor de Geomática no ITA. Especialista em Sistemas Complexos Adaptativos, Sensoriamento Remoto, Ecologia de Grandes Animais e Infraestrutura Aeronáutica.",
           en: "<strong>Background:</strong> Geomatics Professor at ITA. Expert in Complex Adaptive Systems, Remote Sensing, Large Animal Ecology, and Aeronautical Infrastructure." },
    focus: { pt: "Seleção de sítios aeroportuários, mitigação de riscos de inundação e monitoramento ambiental.", en: "Airport site selection, flood-risk mitigation, and environmental monitoring." },
    lines: ["l4", "l5", "l1"], projects: ["mesaa", "mesa", "elos"] },

  { id: "gabriela", group: "researcher", name: "Dra. Gabriela P. R. Banon", short: "Gabriela Banon", photo: "gabriela.gif", lattes: "7642443072435520",
    role: { pt: "Pesquisadora Colaboradora (ITA)", en: "Collaborating Researcher (ITA)" },
    bio: { pt: "<strong>Formação:</strong> Doutora em Medicina Veterinária (USP).<br><strong>Áreas de Interesse:</strong> Sensoriamento remoto aplicado à conservação, Modelagem de Distribuição de Espécies.",
           en: "<strong>Background:</strong> PhD in Veterinary Medicine (USP).<br><strong>Interest Areas:</strong> Remote sensing applied to conservation, Species Distribution Modeling." },
    lines: ["l4"], projects: ["elos"] },

  { id: "kaian", group: "researcher", name: "Dr. Kaian Shahateet", short: "Kaian Shahateet", photo: "kaian.gif", lattes: "5247004527593247",
    role: { pt: "Pesquisador (ITA)", en: "Researcher (ITA)" },
    bio: { pt: "<strong>Formação:</strong> Doutor em Engenharia Matemática (UPM).<br><strong>Áreas de Interesse:</strong> Criosfera, Aprendizado de Máquina, Fusão de Dados.",
           en: "<strong>Background:</strong> PhD in Mathematical Engineering (UPM).<br><strong>Interest Areas:</strong> Cryosphere, Machine Learning, Data Fusion." },
    focus: { pt: "Mapping of Glacier Fractures in Antarctica via Remote Sensing Data Fusion.", en: "Mapping of Glacier Fractures in Antarctica via Remote Sensing Data Fusion." },
    lines: ["l6", "l5"], projects: [] },

  { id: "alef", group: "student", name: "Álef Gonçalves Quintanilha", short: "Álef Quintanilha", photo: "alef.gif", lattes: "7527564826180984",
    role: { pt: "Mestrando em Engenharia de Infraestrutura Aeronáutica (ITA)", en: "MSc Student in Aeronautical Infrastructure Engineering (ITA)" },
    bio: { pt: "<strong>Formação:</strong> Esp. em Engenharia de Dados (PUC-Minas) e Grad. em Sistemas (FATEC).<br><strong>Áreas de Interesse:</strong> Ciência da Computação, Tecnologia da Informação, Planejamento Aeroportuário.",
           en: "<strong>Background:</strong> Specialist in Data Engineering (PUC-Minas) and B.Sc. in Systems (FATEC).<br><strong>Interest Areas:</strong> Computer Science, IT, Airport Planning." },
    focus: { pt: "Detecção de voos não colaborativos na Amazônia: Abordagem Integrada com SR por Sinais Radares.", en: "Detection of non-cooperative flights in the Amazon: Integrated approach with radar-signal RS." },
    lines: ["l1"], projects: [] },

  { id: "aluizio", group: "student", name: "MSc. Aluizio Brito Maia", short: "Aluizio Maia", photo: "aluizio.jpeg", lattes: "8817900721556290",
    role: { pt: "Doutorando em Engenharia de Infraestrutura Aeronáutica (ITA)", en: "PhD Candidate in Aeronautical Infrastructure Engineering (ITA)" },
    bio: { pt: "<strong>Formação:</strong> Mestre em Sensoriamento Remoto (INPE) e Geógrafo (UFMG).<br><strong>Áreas de Interesse:</strong> Hidrologia, Risco de Inundação, Planejamento Aeroportuário.",
           en: "<strong>Background:</strong> MSc in Remote Sensing (INPE) and Geographer (UFMG).<br><strong>Interest Areas:</strong> Hydrology, Flood Risk, Airport Planning." },
    focus: { pt: "A Geospatial Model for Resilient Airport Location Assessment in Brazil.", en: "A Geospatial Model for Resilient Airport Location Assessment in Brazil." },
    lines: ["l3", "l1"], projects: ["mesaa"] },

  { id: "ezequiel", group: "student", name: "MSc. Ezequiel Silva Rocha", short: "Ezequiel Rocha", photo: "ze.gif", lattes: "7922956208156198",
    role: { pt: "Doutorando em Engenharia de Infraestrutura Aeronáutica (ITA)", en: "PhD Candidate in Aeronautical Infrastructure Engineering (ITA)" },
    bio: { pt: "<strong>Formação:</strong> Mestre em Sensoriamento Remoto (INPE) e Engenheiro Civil (UEMA).<br><strong>Áreas de Interesse:</strong> LiDAR, Pavimentação, Eng. de Transportes.",
           en: "<strong>Background:</strong> MSc in Remote Sensing (INPE) and Civil Engineer (UEMA).<br><strong>Interest Areas:</strong> LiDAR, Pavement Engineering, Transport Eng." },
    focus: { pt: "Monitoramento Preditivo da Saúde Estrutural de Pavimentos Aeroportuários (InSAR + LiDAR).", en: "Predictive Structural Health Monitoring of Airport Pavements (InSAR + LiDAR)." },
    lines: ["l1", "l2"], projects: ["lessonia"] },

  { id: "bruna", group: "student", name: "Bruna Bortoluzzi Miraya", short: "Bruna Miraya", photo: "bruna.gif", lattes: "8818133620232586",
    role: { pt: "Mestranda em Engenharia de Infraestrutura Aeronáutica (ITA)", en: "MSc Student in Aeronautical Infrastructure Engineering (ITA)" },
    bio: { pt: "<strong>Formação:</strong> Geóloga (USP).<br><strong>Áreas de Interesse:</strong> Geotecnia, Interferometria SAR, Obras Subterrâneas.",
           en: "<strong>Background:</strong> Geologist (USP).<br><strong>Interest Areas:</strong> Geotechnics, InSAR, Underground Works." },
    focus: { pt: "Recalque da linha 2 do metrô de SP e patologias em edificações: uma abordagem por SAR.", en: "Settlement of São Paulo Metro Line 2 and building pathologies: a SAR approach." },
    lines: ["l2"], projects: ["lessonia"] },

  { id: "leon", group: "student", name: "MSc. Leon Mortari", short: "Leon Mortari", photo: "leon.gif", lattes: "6075587921021179",
    role: { pt: "Doutorando em Engenharia de Infraestrutura Aeronáutica (ITA)", en: "PhD Candidate in Aeronautical Infrastructure Engineering (ITA)" },
    bio: { pt: "<strong>Formação:</strong> Eng. Ambiental, Mestre em Geociências (UnB).<br><strong>Áreas de Interesse:</strong> Análise Multicritério, Planejamento Ambiental, Risco de Fauna.",
           en: "<strong>Background:</strong> Environmental Eng., MSc in Geosciences (UnB).<br><strong>Interest Areas:</strong> Multi-criteria Analysis, Environmental Planning, Wildlife Risk." },
    focus: { pt: "Interações aéreas no entorno de aeroportos dos EUA entre aeronaves e aves.", en: "Aircraft–bird aerial interactions around U.S. airports." },
    lines: ["l6", "l4", "l5"], projects: ["mesaa"] },

  { id: "elida", group: "student", name: "Élida Ariele Pereira Magalhães", short: "Élida Magalhães", photo: "elida.gif", lattes: "7619939585443951",
    role: { pt: "Mestranda em Engenharia de Infraestrutura Aeronáutica (ITA)", en: "MSc Student in Aeronautical Infrastructure Engineering (ITA)" },
    bio: { pt: "<strong>Formação:</strong> Meteorologista (UFPA).<br><strong>Áreas de Interesse:</strong> Meteorologia Sinótica, Ecologia, Climatologia.",
           en: "<strong>Background:</strong> Meteorologist (UFPA).<br><strong>Interest Areas:</strong> Synoptic Meteorology, Ecology, Climatology." },
    focus: { pt: "Fatores Meteorológicos Influenciadores do Voo de Aves Planadoras.", en: "Meteorological Factors Influencing Soaring Bird Flight." },
    lines: ["l4"], projects: [] },

  { id: "gilson", group: "student", name: "Gilson V. Soares Júnior", short: "Gilson Soares Jr.", photo: "gilson.gif", lattes: "5808475579965381",
    role: { pt: "Mestrando em Engenharia de Infraestrutura Aeronáutica (ITA)", en: "MSc Student in Aeronautical Infrastructure Engineering (ITA)" },
    bio: { pt: "<strong>Formação:</strong> Engenheiro Eletricista (ETEP).<br><strong>Áreas de Interesse:</strong> InSAR, Sensoriamento Remoto, Inteligência Artificial.",
           en: "<strong>Background:</strong> Electrical Engineer (ETEP).<br><strong>Interest Areas:</strong> InSAR, Remote Sensing, Artificial Intelligence." },
    focus: { pt: "Monitoramento de Subsidência da Superfície Urbana Usando InSAR e Inteligência Artificial.", en: "Urban Surface Subsidence Monitoring Using InSAR and Artificial Intelligence." },
    lines: ["l2"], projects: ["lessonia"] },

  { id: "nadinne", group: "tech", name: "MSc. Nadinne Oliveira", short: "Nadinne Oliveira", photo: "nadinne.gif", lattes: "3915033815303466",
    role: { pt: "Técnica em Geoprocessamento e Sargento da Força Aérea Brasileira", en: "Geoprocessing Technician and Brazilian Air Force Sergeant" },
    bio: { pt: "<strong>Formação:</strong> Mestre em Geografia (UFSM).<br><strong>Áreas de Interesse:</strong> Geoprocessamento, Cartografia, Sensoriamento Remoto.",
           en: "<strong>Background:</strong> MSc in Geography (UFSM).<br><strong>Interest Areas:</strong> Geoprocessing, Cartography, Remote Sensing." },
    lines: ["l1"], projects: [] },
];

/* ---------- Rede de colaboração e alumni ---------- */
const COLLABORATORS = [
  ["Prof. Dr. David Macdonald", "University of Oxford"],
  ["Prof. Dr. Denise Ferrari", "Divisão de Ciências Fundamentais - ITA"],
  ["Prof. Dr. Dimas Betioli Ribeiro", "Dept. de Geotecnia - ITA"],
  ["Prof. Dr. Evandro José da Silva", "Dept. de Transporte Aéreo - ITA"],
  ["Prof. Dr. Flávio M. Kuwajima", "ITA"],
  ["Prof. Dr. Marcelo X. Guterres", "Dept. de Transporte Aéreo - ITA"],
  ["Prof. Dr. Mats Pettersson", "Blekinge Institute of Technology"],
  ["Prof. Dr. Renato Machado", "Divisão de Eng. Eletrônica - ITA"],
  ["Prof. Dr. Robert Kenward", "UK Centre For Ecology & Hydrology"],
  ["Prof. Dr. Volker Grimm", "Helmholtz-Zentrum (UFZ)"],
  ["Prof. Dr. Wilson Cabral Jr.", "Dept. de Recursos Hídricos - ITA"],
];
const ALUMNI_POST = [
  ["Bruna Fabrin", { pt: "Doutora (PhD, 2024) - Co-orientação", en: "PhD (2024) - Co-supervision" }],
  ["Thiago Cypreste", { pt: "Mestre (MSc, 2024)", en: "MSc (2024)" }],
];
const ALUMNI_GRAD = [
  ["Luan Torres", "TG T19"], ["João Carlos", "TG T23"], ["Letícia Rodrigues", "TG T25"],
];

/* ---------- Publicações ----------
   type: journal | book | conference | technical
   authors: ids de PEOPLE vinculados (membros do lab)                 */
const PUBLICATIONS = [
  { year: 2026, type: "journal", q1: true, title: "Flood Detection in Optical Systems: A Novel Approach to Overcome Cloud Cover with DEM Data.",
    authorsText: "Maia, A.B., Rennó, C. D., Novo, E. M. L. M., Mira, I. R. C.", venue: "IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing",
    authors: ["aluizio"], lines: ["l3", "l1"], tag: "Sensoriamento Remoto", url: "https://ieeexplore.ieee.org/document/11269668/" },
  { year: 2026, type: "journal", title: "Flooding in the Tamanduateí River Hydrographic Basin: A Spatial and Multifactorial Analysis.",
    authorsText: "De Mira, Í. R. C., Maia, A. B., Monteiro, A. M. V., Santos, L. B. L., Rennó, C. D.", venue: "Transactions in GIS",
    authors: ["aluizio"], lines: ["l3"], tag: "Hidrologia", url: "https://doi.org/10.1111/tgis.70213" },
  { year: 2026, type: "journal", title: "Urban Morphology and Infrastructure Patterns: A LiDAR-Based 3D Cluster Analysis Using Verticalization as a Proxy.",
    authorsText: "Rocha, E. S.; Maia, A. B.; Almeida, C. M.; Ruiz, P. R. S.", venue: "ISPRS Annals of the Photogrammetry, Remote Sensing and Spatial Information Sciences",
    authors: ["ezequiel", "aluizio"], lines: ["l1"], tag: "LiDAR / SR", url: "https://isprs-annals.copernicus.org/articles/X-3-W4-2025/313/2026/" },
  { year: 2025, type: "journal", title: "A reconstruction of the ice thickness of the Antarctic Peninsula Ice Sheet north of 70°-S.",
    authorsText: "Shahateet, K.; Fürst, J.; Navarro, F.; Seehaus, T.; Farinotti, D.; Braun, M.", venue: "The Cryosphere",
    authors: ["kaian"], lines: ["l6"], tag: "Glaciologia", url: "https://tc.copernicus.org/articles/19/1577/2025/" },
  { year: 2025, type: "journal", title: "Exploring the Relationship between Urbanization, Floods and Green Infrastructures: A Study in The Nado Stream Watershed, Belo Horizonte, Brazil.",
    authorsText: "Brito, Aluizio; Rodrigues Macedo, Diego.", venue: "Revista Brasileira de Geografia Física",
    authors: ["aluizio"], lines: ["l3"], tag: "Hidrologia Urbana", url: "https://periodicos.ufpe.br/revistas/rbgfe/article/view/264041" },
  { year: 2025, type: "journal", title: "Uso do Sensoriamento Remoto na Análise de Qualidade e Identificação de Defeitos em Pavimentos Flexíveis: Uma Revisão Sistemática.",
    authorsText: "Rocha, Ezequiel Silva; Almeida, Cláudia Maria de; Kampel, Milton; Ruiz, Paulo Roberto da Silva.", venue: "RBC. Revista Brasileira de Cartografia",
    authors: ["ezequiel"], lines: ["l1", "l2"], tag: "Sensoriamento Remoto", url: "https://seer.ufu.br/index.php/revistabrasileiracartografia/article/view/77751" },
  { year: 2024, type: "journal", q1: true, title: "Towards balancing efficiency and customer satisfaction in airplane boarding: An agent-based approach.",
    authorsText: "Fabrin, Bruna H.P.; Ferrari, Denise B.; Arraut, Eduardo M.; Neumann, Simone.", venue: "Operations Research Perspectives",
    authors: ["eduardo"], lines: ["l5"], tag: "Simulação (ABM)", url: "https://www.sciencedirect.com/science/article/pii/S2214716024000058" },
  { year: 2024, type: "journal", title: "A 3D glacier dynamics-line plume model to estimate the frontal ablation of Hansbreen, Svalbard.",
    authorsText: "Muñoz-Hermosilla, J. M.; Otero, J.; De Andrés, E.; Shahateet, K.; Navarro, F.; Pérez-Doña, I.", venue: "The Cryosphere",
    authors: ["kaian"], lines: ["l6"], tag: "Glaciologia / Modelagem", url: "https://tc.copernicus.org/articles/18/1911/2024/" },
  { year: 2024, type: "journal", title: "Comparing the Segment Anything Model with Region Growing Algorithms in the detection of irrigated croplands.",
    authorsText: "Petrone, F. G.; Silva, D. T.; Chaves, M. E. D.; Korting, T. S.; Adami, M.; Maia, A. B.; Sanches, I. D.; Fonseca, L. M. G.", venue: "RBC. Revista Brasileira de Cartografia",
    authors: ["aluizio"], lines: ["l1", "l5"], tag: "Machine Learning / SR", url: "https://seer.ufu.br/index.php/revistabrasileiracartografia/article/view/72592" },
  { year: 2024, type: "journal", title: "The Importance of Solving Subglaciar Hydrology in Modeling Glacier Retreat: A Case Study of Hansbreen, Svalbard.",
    authorsText: "De Andrés, E.; Muñoz-Hermosilla, J.; Shahateet, K.; Otero, J.", venue: "Hydrology",
    authors: ["kaian"], lines: ["l6", "l3"], tag: "Hidrologia / Glaciologia", url: "https://www.mdpi.com/2306-5338/11/11/193" },
  { year: 2024, type: "journal", title: "A Evolução da Acurácia das coleções do MapBiomas para a Paisagem Altamente Fragmentada de São Paulo.",
    authorsText: "Fernandes, N.; Arraut, E. M.", venue: "Revista Brasileira de Cartografia",
    authors: ["nadinne", "eduardo"], lines: ["l1", "l4"], tag: "Sensoriamento Remoto", url: "https://seer.ufu.br/index.php/revistabrasileiracartografia" },
  { year: 2021, type: "journal", q1: true, title: "Anticipation of common buzzard population patterns in the changing UK landscape.",
    authorsText: "Arraut, E. M.; Walls, S. W.; Macdonald, D.W.; Kenward, R. E.", venue: "Proceedings of the Royal Society B-Biological Sciences",
    authors: ["eduardo"], lines: ["l4", "l5"], tag: "Ecologia / ABM", url: "https://royalsocietypublishing.org/rspb/article/288/1952/20210993/79177/Anticipation-of-common-buzzard-population-patterns" },
  { year: 2020, type: "journal", title: "Towards an objective decision-making framework for regional airport site selection.",
    authorsText: "Alves, C. J. P.; Silva, E. J.; Muller, C.; Ronzani, G.; Guterres, M. X.; Arraut, E. M.; Peres, M. S.; Santos, R. J.", venue: "Journal of Air Transport Management",
    authors: ["eduardo"], lines: ["l5", "l1"], tag: "Infraestrutura", url: "https://doi.org/10.1016/j.jairtraman.2020.101888" },
  { year: 2019, type: "journal", title: "A review on crocodilian nesting habitats and their characterisation via remote sensing.",
    authorsText: "Banon, G. P. R.; Renno, C. D.; Arraut, E. M.; Villamarin, F.; Moulatlet, G; Novo, E. M. L. M.; Marioni, B.", venue: "Amphibia-Reptilia",
    authors: ["eduardo", "gabriela"], lines: ["l4"], tag: "Ecologia / SR", url: "https://brill.com/view/journals/amre/40/4/article-p403_1.xml" },
  { year: 2018, type: "journal", q1: true, title: "Resource-Area-Dependence Analysis: Inferring animal resource needs from home-range and mapping data.",
    authorsText: "Kenward, R. E.; Arraut, Eduardo M.; Robertson, P. A.; Walls, S. W.; Casey, N.; Aebischer, N. J.", venue: "PLoS One",
    authors: ["eduardo"], lines: ["l4", "l5"], tag: "Ecologia / Modelagem", url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0206354" },
  { year: 2018, type: "journal", title: "Novas ocorrências de tufas no Vale do Ribeira (SP).",
    authorsText: "Miraya, B. B.; Ribeiro, L. M. A. L.; Boggiani, P. C.; Shimada, H.", venue: "Geociências (São Paulo. Online)",
    authors: ["bruna"], lines: ["l2"], tag: "Geociências", url: "" },
];

const PUB_TABS = ["journal", "book", "conference", "technical"];


/* ---------- Redes sociais (barra superior) ----------
   Deixe url vazio ("") para o ícone aparecer apagado; preencha depois. */
const SOCIALS = [
  { name: "Instagram", icon: "fa-brands fa-instagram", url: "" },
  { name: "ResearchGate", icon: "fa-brands fa-researchgate", url: "" },
  { name: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "" },
  { name: "YouTube", icon: "fa-brands fa-youtube", url: "" },
  { name: "Google Scholar", icon: "fa-solid fa-graduation-cap", url: "" },
  { name: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/labgeo-ita" },
];
