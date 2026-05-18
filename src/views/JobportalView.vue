<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BusinessLogo from '../assets/logos/Business logo.svg'
import { businessNetworkJobs } from '../data/businessnetwork'

const { t, locale } = useI18n()
const searchQuery = ref('')
const openId = ref(null)

// Translations for company details (description & focus areas)
const companyTranslations = {
  da: {
    1: { description: 'Erhvervsudvikling og vækst for virksomheder i Esbjerg-området. Business Esbjerg fokuserer på iværksætteri, direkte investering og lokal forretningsudvikling. Organisationen arbejder tæt sammen med virksomheder for at identificere og udnytte vækstmuligheder i regionen.', focusAreas: ['Erhvervsudvikling', 'Iværksætteri', 'Vækst', 'Jobskabelse'] },
    2: { description: 'Arbejder med erhvervsservice, innovation og udvikling af virksomheder i Kolding Kommune. Business Kolding tilbyder rådgivning inden for digitalisering, innovation og eksportudvikling. Organisationen understøtter både etablerede virksomheder og startup.', focusAreas: ['Innovation', 'Digitalisering', 'Erhvervsudvikling', 'Eksport'] },
    3: { description: 'Hjælper virksomheder med vækst, netværk og erhvervsudvikling i Aabenraa-området. Som del af Business Region arbejder Aabenraa-organisationen på at styrke lokale virksomheder og tiltrække nye investeringer gennem strategisk netværksarbejde.', focusAreas: ['Networking', 'Vækst', 'Erhvervsudvikling', 'Internationalt samarbejde'] },
    4: { description: 'Dansk organisation der tiltrækker internationale virksomheder, investeringer og talenter til Danmark. Copenhagen Capacity positionerer København og Danmark som foretrukne destinationer for innovation og erhvervsudvikling globalt.', focusAreas: ['Internationalt samarbejde', 'Investering', 'Talentrekruttering', 'Vækst'] },
    5: { description: 'Brancheorganisation for danske virksomheder med fokus på erhvervspolitik, vækst og international konkurrenceevne. DI repræsenterer danske industrivirksomheders interesser og arbejder for at forbedre rammevilkår for dansk erhvervsliv.', focusAreas: ['Erhvervspolitik', 'International konkurrenceevne', 'Vækst', 'Innovation'] },
    6: { description: 'Regional offentlig organisation der arbejder med udvikling, infrastruktur, sundhed og erhvervsvækst i Syddanmark. Region Syddanmark spiller en vigtig rolle i koordination af regionale udviklingsprojekter og strategier.', focusAreas: ['Regional udvikling', 'Infrastruktur', 'Erhvervsudvikling', 'Vækst'] },
    7: { description: 'Tilbyder rådgivning og støtte til virksomheder indenfor digitalisering, eksport og udvikling. Erhvervshus er statsligt finansieret institution der hjælper virksomheder med strategisk udvikling og ekspansion.', focusAreas: ['Digitalisering', 'Eksport', 'Erhvervsudvikling', 'Innovation'] },
    8: { description: 'Lokal erhvervsorganisation der støtter virksomheder og iværksættere i Tønder Kommune. Organisationen arrangerer netværksmøder, workshops og forbinder lokale virksomheder med regionale og internationale partnere.', focusAreas: ['Iværksætteri', 'Jobskabelse', 'Lokalt samarbejde', 'Networking'] },
    9: { description: 'Samarbejde mellem kommuner om erhvervsudvikling, grøn omstilling og innovation. Trekantområdet repræsenterer tværkommunalt samarbejde om vision for bæredygtig vækst og innovation.', focusAreas: ['Innovation', 'Grøn omstilling', 'Erhvervsudvikling', 'Vækst'] },
    10: { description: 'Regionalt samarbejde med fokus på vækst, udvikling og arbejdsmarked i Sønderjylland. Rådet arbejder på at identificere udviklingspotentialer og koordinere indsatser på tværs af sektorer og kommune grænser.', focusAreas: ['Vækst', 'Jobskabelse', 'Uddannelse', 'Arbejdsmarkedssikring'] },
    11: { description: 'Hjælper internationale medarbejdere og virksomheder med rekruttering og integration i Syddanmark. Organisationen arbejder for at gøre det lettere for udenlandske talenter at få arbejde og etablere sig i Danmark.', focusAreas: ['Talentrekruttering', 'Internationalt samarbejde', 'Jobskabelse', 'Integration'] },
    12: { description: 'Tysk regional udviklingsorganisation med fokus på innovation, mobilitet og bæredygtig vækst. KielRegion arbejder på at gøre Kiel-regionen attraktiv for innovation og investeringer indenfor nye teknologier.', focusAreas: ['Innovation', 'Mobilitet', 'Bæredygtighed', 'Internationalt samarbejde'] },
    13: { description: 'Tysk handelskammer der støtter virksomheder med rådgivning, netværk og erhvervsudvikling. IHK Flensburg repræsenterer erhvervets interesser i Flensburg-regionen og arrangerer netværksmøder og træning.', focusAreas: ['Erhvervsudvikling', 'Networking', 'Internationalt samarbejde', 'Vækst'] },
    14: { description: 'Uddannelsesinstitution med fokus på forskning, innovation og samarbejde med erhvervslivet. Hochschule Flensburg tilbyder praktisk orienteret uddannelse og driver forskning relevant for regional industri.', focusAreas: ['Uddannelse', 'Innovation', 'Forskning', 'Erhvervssamarbejde'] },
    15: { description: 'Grænseoverskridende netværk der arbejder med infrastruktur, erhverv og regional udvikling mellem Danmark og Tyskland. HanseBelt er platform for dansk-tysk samarbejde og fokuserer på fælles udviklingsprojekter.', focusAreas: ['Internationalt samarbejde', 'Infrastruktur', 'Regional udvikling', 'Vækst'] },
    16: { description: 'Regional erhvervsorganisation der understøtter vækst og investeringer i Nordfriesland. WFG Nordfriesland arbejder på at tiltrække virksomheder til regionen og støtter lokale virksomheders ekspansion.', focusAreas: ['Investering', 'Vækst', 'Erhvervsudvikling', 'Internationalt samarbejde'] },
    17: { description: 'Tysk erhvervsnetværk der repræsenterer virksomheder og styrker regional økonomisk udvikling. Organisationen arrangerer møder, dele erfaringer og arbejder for at forbedre rammevilkår for medlemmer.', focusAreas: ['Vækst', 'Erhvervsudvikling', 'Internationalt samarbejde', 'Networking'] },
    18: { description: 'Tysk arbejdsformidling der hjælper virksomheder og jobsøgende med rekruttering og placering. Agentur für Arbeit tilbyder rådgivning og faciliterer matchning mellem arbejdsgivere og jobsøgende.', focusAreas: ['Jobskabelse', 'Talentrekruttering', 'Uddannelse', 'Arbejdsmarkedssikring'] },
    19: { description: 'Tysk national arbejdsmarkedsorganisation der arbejder med jobplacement og erhvervsudvikling. Bundesagentur fungerer som national arbejdsmarkedsinstans og koordinerer indsatser for jobsikring og uddannelse.', focusAreas: ['Jobskabelse', 'Uddannelse', 'Talentrekruttering', 'Vækst'] },
    20: { description: 'Lokalt samarbejde om erhvervsudvikling, innovation og vækst i Sønderborg-området. Vækstrrådet arbejder på at identificere og udnytte vækstpotentialer og koordinerer tværsektorale indsatser.', focusAreas: ['Vækst', 'Innovation', 'Erhvervsudvikling', 'Jobskabelse'] },
    21: { description: 'Lokalt erhvervsforum der arbejder med vækst og udvikling for virksomheder i Vejen Kommune. Rådet faciliterer netværk og koordinerer udviklingsprojekter relevant for lokale virksomheder.', focusAreas: ['Erhvervsudvikling', 'Vækst', 'Networking', 'Jobskabelse'] },
    22: { description: 'Tysk regional arbejdsmarkedsmyndighed med fokus på jobplacement og erhvervsudvikling. Regionaldirektion Nord koordinerer arbejdsmarkedsindsatser for området omkring Kiel og arbejdsmarkedet i Nord-Tyskland.', focusAreas: ['Jobskabelse', 'Talentrekruttering', 'Uddannelse', 'Internationalt samarbejde'] },
    23: { description: 'Erhvervsservice og rådgivning til små og mellemstore virksomheder i Sydjylland. S/I Erhvervshus tilbyder coaching, strategisk rådgivning og adgang til lånefinansiering for virksomhedsudvikling.', focusAreas: ['Erhvervsudvikling', 'Innovation', 'Vækst', 'Finansiering'] },
    24: { description: 'Tysk erhvervsforening der støtter virksomheder gennem netværk og udviklingsprojekter. Organisationen arrangerer møder, seminarer og faciliterer samarbejde mellem medlemmer for fælles vækst.', focusAreas: ['Networking', 'Vækst', 'Erhvervsudvikling', 'Internationalt samarbejde'] },
    25: { description: 'Initiative der arbejder med at tiltrække talent, virksomheder og investeringer til Syddanmark. Work-live-stay fokuserer på at positionere regionen som attraktiv destination for arbejdskraft, bosætning og erhvervsaktivitet.', focusAreas: ['Talentrekruttering', 'Investering', 'Internationalt samarbejde', 'Vækst'] },
    26: { description: 'Grænseregionalt samarbejde mellem virksomheder, organisationer og institutioner for fælles vækst og udvikling. Business Region er samarbejdsplatformen der forbinder alle medlemmer og koordinerer grænseregionale initiativer.', focusAreas: ['Internationalt samarbejde', 'Vækst', 'Innovation', 'Erhvervsudvikling'] },
  },
  de: {
    1: { description: 'Wirtschaftsentwicklung und Wachstum für Unternehmen im Raum Esbjerg. Business Esbjerg konzentriert sich auf Unternehmertum, direkte Investitionen und lokale Geschäftsentwicklung. Das Unternehmen arbeitet eng mit Unternehmen zusammen, um Wachstumschancen in der Region zu identifizieren und zu nutzn.', focusAreas: ['Wirtschaftsentwicklung', 'Unternehmertum', 'Wachstum', 'Schaffung von Arbeitsplätzen'] },
    2: { description: 'Befasst sich mit Unternehmerservices, Innovation und Unternehmungsentwicklung in der Gemeinde Kolding. Business Kolding bietet Beratung in den Bereichen Digitalisierung, Innovation und Exportentwicklung. Das Unternehmen unterstützt sowohl etablierte Unternehmen als auch Startups.', focusAreas: ['Innovation', 'Digitalisierung', 'Wirtschaftsentwicklung', 'Export'] },
    3: { description: 'Unterstützt Unternehmen bei Wachstum, Netzwerken und Wirtschaftsentwicklung im Raum Aabenraa. Als Teil der Business Region arbeitet die Aabenraa-Organisation daran, lokale Unternehmen zu stärken und neue Investitionen durch strategische Netzwerkarbeit anzuziehen.', focusAreas: ['Netzwerkaufbau', 'Wachstum', 'Wirtschaftsentwicklung', 'Internationale Zusammenarbeit'] },
    4: { description: 'Dänische Organisation, die internationale Unternehmen, Investitionen und Talente nach Dänemark anzieht. Copenhagen Capacity positioniert Kopenhagen und Dänemark als bevorzugte Ziele für Innovation und Wirtschaftsentwicklung weltweit.', focusAreas: ['Internationale Zusammenarbeit', 'Investition', 'Talentakquisition', 'Wachstum'] },
    5: { description: 'Branchenorganisation dänischer Unternehmen mit Fokus auf Wirtschaftspolitik, Wachstum und internationale Wettbewerbsfähigkeit. DI vertritt die Interessen dänischer Industrieunternehmen und arbeitet an der Verbesserung der Rahmenbedingungen für die dänische Wirtschaft.', focusAreas: ['Wirtschaftspolitik', 'Internationale Wettbewerbsfähigkeit', 'Wachstum', 'Innovation'] },
    6: { description: 'Regionale öffentliche Organisation, die sich mit Entwicklung, Infrastruktur, Gesundheit und Wirtschaftswachstum in Süddänemark befasst. Region Syddanmark spielt eine wichtige Rolle bei der Koordinierung regionaler Entwicklungsprojekte und Strategien.', focusAreas: ['Regionalentwicklung', 'Infrastruktur', 'Wirtschaftsentwicklung', 'Wachstum'] },
    7: { description: 'Bietet Beratung und Unterstützung für Unternehmen in den Bereichen Digitalisierung, Export und Entwicklung. Erhvervshus ist eine staatlich finanzierte Institution, die Unternehmen bei strategischer Entwicklung und Expansion unterstützt.', focusAreas: ['Digitalisierung', 'Export', 'Wirtschaftsentwicklung', 'Innovation'] },
    8: { description: 'Lokale Wirtschaftsorganisation, die Unternehmen und Unternehmer in der Gemeinde Tønder unterstützt. Die Organisation veranstaltet Netzwerktreffen, Workshops und verbindet lokale Unternehmen mit regionalen und internationalen Partnern.', focusAreas: ['Unternehmertum', 'Schaffung von Arbeitsplätzen', 'Lokale Zusammenarbeit', 'Netzwerkaufbau'] },
    9: { description: 'Zusammenarbeit zwischen Gemeinden bei Wirtschaftsentwicklung, grüner Umstellung und Innovation. Trekantområdet repräsentiert zwischengemeindliche Zusammenarbeit mit der Vision für nachhaltiges Wachstum und Innovation.', focusAreas: ['Innovation', 'Grüne Umstellung', 'Wirtschaftsentwicklung', 'Wachstum'] },
    10: { description: 'Regionale Zusammenarbeit mit Fokus auf Wachstum, Entwicklung und Arbeitsmarkt in Südjütland. Der Rat arbeitet daran, Entwicklungspotentiale zu identifizieren und Maßnahmen über Sektoren und Gemeindegrenzen hinweg zu koordinieren.', focusAreas: ['Wachstum', 'Schaffung von Arbeitsplätzen', 'Bildung', 'Arbeitsmarktsicherung'] },
    11: { description: 'Unterstützt internationale Arbeitnehmer und Unternehmen bei der Rekrutierung und Integration in Süddänemark. Die Organisation arbeitet daran, es ausländischen Talenten zu erleichtern, Arbeit zu finden und sich in Dänemark niederzulassen.', focusAreas: ['Talentakquisition', 'Internationale Zusammenarbeit', 'Schaffung von Arbeitsplätzen', 'Integration'] },
    12: { description: 'Deutsche regionale Entwicklungsorganisation mit Fokus auf Innovation, Mobilität und nachhaltiges Wachstum. KielRegion arbeitet daran, die Kiel-Region für Innovation und Investitionen in neue Technologien attraktiv zu machen.', focusAreas: ['Innovation', 'Mobilität', 'Nachhaltigkeit', 'Internationale Zusammenarbeit'] },
    13: { description: 'Deutsche Handelskammer, die Unternehmen mit Beratung, Netzwerk und Wirtschaftsentwicklung unterstützt. IHK Flensburg vertritt die Wirtschaftsinteressen in der Flensburg-Region und veranstaltet Netzwerktreffen und Trainings.', focusAreas: ['Wirtschaftsentwicklung', 'Netzwerkaufbau', 'Internationale Zusammenarbeit', 'Wachstum'] },
    14: { description: 'Bildungsinstitution mit Fokus auf Forschung, Innovation und Zusammenarbeit mit der Wirtschaft. Hochschule Flensburg bietet praktisch orientierte Ausbildung und betreibt Forschung, die für die regionale Industrie relevant ist.', focusAreas: ['Bildung', 'Innovation', 'Forschung', 'Wirtschaftliche Zusammenarbeit'] },
    15: { description: 'Grenzüberschreitendes Netzwerk, das sich mit Infrastruktur, Wirtschaft und Regionalentwicklung zwischen Dänemark und Deutschland befasst. HanseBelt ist eine Plattform für deutsch-dänische Zusammenarbeit und konzentriert sich auf gemeinsame Entwicklungsprojekte.', focusAreas: ['Internationale Zusammenarbeit', 'Infrastruktur', 'Regionalentwicklung', 'Wachstum'] },
    16: { description: 'Regionale Wirtschaftsorganisation, die Wachstum und Investitionen in Nordfriesland unterstützt. WFG Nordfriesland arbeitet daran, Unternehmen in die Region zu locken und lokale Unternehmen bei der Expansion zu unterstützen.', focusAreas: ['Investition', 'Wachstum', 'Wirtschaftsentwicklung', 'Internationale Zusammenarbeit'] },
    17: { description: 'Deutsches Wirtschaftsnetzwerk, das Unternehmen vertritt und die regionale Wirtschaftsentwicklung stärkt. Die Organisation veranstaltet Treffen, teilt Erfahrungen und arbeitet an der Verbesserung der Rahmenbedingungen für Mitglieder.', focusAreas: ['Wachstum', 'Wirtschaftsentwicklung', 'Internationale Zusammenarbeit', 'Netzwerkaufbau'] },
    18: { description: 'Deutsche Arbeitsvermittlung, die Unternehmen und Arbeitssuchende bei Rekrutierung und Platzierung unterstützt. Agentur für Arbeit bietet Beratung und vermittelt zwischen Arbeitgebern und Arbeitssuchenden.', focusAreas: ['Schaffung von Arbeitsplätzen', 'Talentakquisition', 'Bildung', 'Arbeitsmarktsicherung'] },
    19: { description: 'Deutsche nationale Arbeitsmarktorganisation, die sich mit Jobplatzierung und Wirtschaftsentwicklung befasst. Bundesagentur fungiert als nationale Arbeitsmarktinstitution und koordiniert Maßnahmen für Jobsicherung und Bildung.', focusAreas: ['Schaffung von Arbeitsplätzen', 'Bildung', 'Talentakquisition', 'Wachstum'] },
    20: { description: 'Lokale Zusammenarbeit in Wirtschaftsentwicklung, Innovation und Wachstum im Raum Sønderborg. Der Wachstumsrat arbeitet daran, Wachstumspotentiale zu identifizieren und zu nutzen und koordiniert sektorübergreifende Maßnahmen.', focusAreas: ['Wachstum', 'Innovation', 'Wirtschaftsentwicklung', 'Schaffung von Arbeitsplätzen'] },
    21: { description: 'Lokales Wirtschaftsforum, das sich mit Wachstum und Entwicklung von Unternehmen in der Gemeinde Vejen befasst. Der Rat erleichtert Netzwerke und koordiniert Entwicklungsprojekte, die für lokale Unternehmen relevant sind.', focusAreas: ['Wirtschaftsentwicklung', 'Wachstum', 'Netzwerkaufbau', 'Schaffung von Arbeitsplätzen'] },
    22: { description: 'Deutsche regionale Arbeitsmarktbehörde mit Fokus auf Jobplatzierung und Wirtschaftsentwicklung. Regionaldirektion Nord koordiniert Arbeitsmarktmaßnahmen für den Raum Kiel und den Arbeitsmarkt in Norddeutschland.', focusAreas: ['Schaffung von Arbeitsplätzen', 'Talentakquisition', 'Bildung', 'Internationale Zusammenarbeit'] },
    23: { description: 'Unternehmensservice und Beratung für kleine und mittlere Unternehmen in Südjütland. S/I Erhvervshus bietet Coaching, strategische Beratung und Zugang zu Finanzierungen für Unternehmensentwicklung.', focusAreas: ['Wirtschaftsentwicklung', 'Innovation', 'Wachstum', 'Finanzierung'] },
    24: { description: 'Deutscher Wirtschaftsverein, der Unternehmen durch Netzwerke und Entwicklungsprojekte unterstützt. Die Organisation veranstaltet Treffen, Seminare und facilitiert Zusammenarbeit zwischen Mitgliedern für gemeinsames Wachstum.', focusAreas: ['Netzwerkaufbau', 'Wachstum', 'Wirtschaftsentwicklung', 'Internationale Zusammenarbeit'] },
    25: { description: 'Initiative, die daran arbeitet, Talente, Unternehmen und Investitionen nach Süddänemark zu ziehen. Work-live-stay konzentriert sich darauf, die Region als attraktive Destination für Arbeitskräfte, Ansiedlung und Wirtschaftstätigkeit zu positionieren.', focusAreas: ['Talentakquisition', 'Investition', 'Internationale Zusammenarbeit', 'Wachstum'] },
    26: { description: 'Grenzregionale Zusammenarbeit zwischen Unternehmen, Organisationen und Institutionen für gemeinsames Wachstum und Entwicklung. Business Region ist die Zusammenarbitsplattform, die alle Mitglieder verundet und koordiniert grenzüberschreitende Initiativen.', focusAreas: ['Internationale Zusammenarbeit', 'Wachstum', 'Innovation', 'Wirtschaftsentwicklung'] },
  },
  en: {
    1: { description: 'Business development and growth for companies in the Esbjerg area. Business Esbjerg focuses on entrepreneurship, direct investment and local business development. The organization works closely with companies to identify and exploit growth opportunities in the region.', focusAreas: ['Business Development', 'Entrepreneurship', 'Growth', 'Job Creation'] },
    2: { description: 'Works with business services, innovation and business development in Kolding Municipality. Business Kolding offers advisory services in digitalization, innovation and export development. The organization supports both established businesses and startups.', focusAreas: ['Innovation', 'Digitalization', 'Business Development', 'Export'] },
    3: { description: 'Helps companies with growth, networking and business development in the Aabenraa area. As part of Business Region, the Aabenraa organization works to strengthen local businesses and attract new investments through strategic networking.', focusAreas: ['Networking', 'Growth', 'Business Development', 'International Collaboration'] },
    4: { description: 'Danish organization that attracts international companies, investments and talent to Denmark. Copenhagen Capacity positions Copenhagen and Denmark as preferred destinations for innovation and business development globally.', focusAreas: ['International Collaboration', 'Investment', 'Talent Acquisition', 'Growth'] },
    5: { description: 'Trade association for Danish companies with focus on business policy, growth and international competitiveness. DI represents the interests of Danish industrial companies and works to improve the framework conditions for Danish business life.', focusAreas: ['Business Policy', 'International Competitiveness', 'Growth', 'Innovation'] },
    6: { description: 'Regional public organization working with development, infrastructure, health and business growth in South Denmark. Region Syddanmark plays an important role in coordinating regional development projects and strategies.', focusAreas: ['Regional Development', 'Infrastructure', 'Business Development', 'Growth'] },
    7: { description: 'Provides advisory services and support to companies within digitalization, export and development. Erhvervshus is a state-funded institution that helps companies with strategic development and expansion.', focusAreas: ['Digitalization', 'Export', 'Business Development', 'Innovation'] },
    8: { description: 'Local business organization supporting companies and entrepreneurs in Tønder Municipality. The organization arranges networking meetings, workshops and connects local businesses with regional and international partners.', focusAreas: ['Entrepreneurship', 'Job Creation', 'Local Collaboration', 'Networking'] },
    9: { description: 'Collaboration between municipalities on business development, green transition and innovation. Trekantområdet represents inter-municipal collaboration with a vision for sustainable growth and innovation.', focusAreas: ['Innovation', 'Green Transition', 'Business Development', 'Growth'] },
    10: { description: 'Regional collaboration focusing on growth, development and labor market in South Jutland. The council works to identify development potentials and coordinate efforts across sectors and municipal boundaries.', focusAreas: ['Growth', 'Job Creation', 'Education', 'Labor Market Security'] },
    11: { description: 'Helps international employees and companies with recruitment and integration in South Denmark. The organization works to make it easier for foreign talent to find work and establish themselves in Denmark.', focusAreas: ['Talent Acquisition', 'International Collaboration', 'Job Creation', 'Integration'] },
    12: { description: 'German regional development organization focusing on innovation, mobility and sustainable growth. KielRegion works to make the Kiel region attractive for innovation and investment in new technologies.', focusAreas: ['Innovation', 'Mobility', 'Sustainability', 'International Collaboration'] },
    13: { description: 'German chamber of commerce supporting companies with advisory services, networking and business development. IHK Flensburg represents business interests in the Flensburg region and arranges networking meetings and training.', focusAreas: ['Business Development', 'Networking', 'International Collaboration', 'Growth'] },
    14: { description: 'Educational institution focusing on research, innovation and collaboration with business. Hochschule Flensburg offers practically oriented education and conducts research relevant to regional industry.', focusAreas: ['Education', 'Innovation', 'Research', 'Business Collaboration'] },
    15: { description: 'Cross-border network working with infrastructure, business and regional development between Denmark and Germany. HanseBelt is a platform for Danish-German collaboration and focuses on joint development projects.', focusAreas: ['International Collaboration', 'Infrastructure', 'Regional Development', 'Growth'] },
    16: { description: 'Regional business organization supporting growth and investments in North Frisia. WFG Nordfriesland works to attract companies to the region and supports local business expansion.', focusAreas: ['Investment', 'Growth', 'Business Development', 'International Collaboration'] },
    17: { description: 'German business network representing companies and strengthening regional economic development. The organization arranges meetings, shares experiences and works to improve framework conditions for members.', focusAreas: ['Growth', 'Business Development', 'International Collaboration', 'Networking'] },
    18: { description: 'German employment placement that helps companies and job seekers with recruitment and placement. Agentur für Arbeit offers advisory services and facilitates matching between employers and job seekers.', focusAreas: ['Job Creation', 'Talent Acquisition', 'Education', 'Labor Market Security'] },
    19: { description: 'German national labor market organization working with job placement and business development. Bundesagentur functions as a national labor market authority and coordinates efforts for job security and education.', focusAreas: ['Job Creation', 'Education', 'Talent Acquisition', 'Growth'] },
    20: { description: 'Local collaboration on business development, innovation and growth in the Sønderborg area. The growth council works to identify and exploit growth potentials and coordinate cross-sector efforts.', focusAreas: ['Growth', 'Innovation', 'Business Development', 'Job Creation'] },
    21: { description: 'Local business forum working with growth and development for companies in Vejen Municipality. The council facilitates networks and coordinates development projects relevant to local businesses.', focusAreas: ['Business Development', 'Growth', 'Networking', 'Job Creation'] },
    22: { description: 'German regional labor market authority focusing on job placement and business development. Regionaldirektion Nord coordinates labor market efforts for the Kiel area and the labor market in Northern Germany.', focusAreas: ['Job Creation', 'Talent Acquisition', 'Education', 'International Collaboration'] },
    23: { description: 'Business service and advisory for small and medium-sized companies in South Jutland. S/I Erhvervshus offers coaching, strategic advice and access to financing for business development.', focusAreas: ['Business Development', 'Innovation', 'Growth', 'Financing'] },
    24: { description: 'German business association supporting companies through networks and development projects. The organization arranges meetings, seminars and facilitates collaboration between members for joint growth.', focusAreas: ['Networking', 'Growth', 'Business Development', 'International Collaboration'] },
    25: { description: 'Initiative working to attract talent, companies and investments to South Denmark. Work-live-stay focuses on positioning the region as an attractive destination for labor, settlement and business activity.', focusAreas: ['Talent Acquisition', 'Investment', 'International Collaboration', 'Growth'] },
    26: { description: 'Cross-border collaboration between companies, organizations and institutions for joint growth and development. Business Region is the collaboration platform connecting all members and coordinating cross-border initiatives.', focusAreas: ['International Collaboration', 'Growth', 'Innovation', 'Business Development'] },
  }
}

const companyLogoPaths = {
  1: '/src/assets/logos/virksomheder/business-esbjerg.svg',
  2: '/src/assets/logos/virksomheder/business-kolding.svg',
  3: '/src/assets/logos/virksomheder/business-aabenraa.svg',
  4: '/src/assets/logos/virksomheder/copenhagen-capacity.svg',
  5: '/src/assets/logos/virksomheder/dansk-industri.svg',
  6: '/src/assets/logos/virksomheder/region-syddanmark.svg',
  7: '/src/assets/logos/virksomheder/erhvervshus-sydjylland.svg',
  8: '/src/assets/logos/virksomheder/tonder-erhvervsraad.svg',
  9: '/src/assets/logos/virksomheder/trekantomradet-danmark.svg',
  10: '/src/assets/logos/virksomheder/udviklingsrad-sonderjylland.svg',
  11: '/src/assets/logos/virksomheder/workindenmark-south.svg',
  12: '/src/assets/logos/virksomheder/kielregion.svg',
  13: '/src/assets/logos/virksomheder/ihk-flensburg.svg',
  14: '/src/assets/logos/virksomheder/hochschule-flensburg.svg',
  15: '/src/assets/logos/virksomheder/hansebelt.svg',
  16: '/src/assets/logos/virksomheder/wfg-nordfriesland.svg',
  17: '/src/assets/logos/virksomheder/unternehmensverband-unterelbe-westkuste.svg',
  18: '/src/assets/logos/virksomheder/agentur-fur-arbeit-flensburg.svg',
  19: '/src/assets/logos/virksomheder/bundesagentur-fur-arbeit.svg',
  20: '/src/assets/logos/virksomheder/sonderborg-vaekstrad.svg',
  21: '/src/assets/logos/virksomheder/udviklingsrad-vejen.svg',
  22: '/src/assets/logos/virksomheder/regionaldirektion-nord.svg',
  23: '/src/assets/logos/virksomheder/erhvervshus-sydjylland.svg',
  24: '/src/assets/logos/virksomheder/wirtschaftsvereinigung-eutin.svg',
  25: '/src/assets/logos/virksomheder/work-live-stay.svg',
  26: '/src/assets/logos/virksomheder/business-region-graense.svg',
}

const getJobLogo = (job) => {
  return companyLogoPaths[job.id] ?? BusinessLogo
}

const handleLogoError = (event) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = BusinessLogo
}

// Helper function to get translated company data
const getTranslatedCompany = (job) => {
  const translations = companyTranslations[locale.value] || companyTranslations.da
  const translated = translations[job.id]
  return {
    ...job,
    description: translated?.description || job.description,
    focusAreas: translated?.focusAreas || job.focusAreas
  }
}

const filteredJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return businessNetworkJobs
  return businessNetworkJobs.filter((job) => job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query))
})

const translatedFilteredJobs = computed(() => {
  locale.value // Force reactivity on language change
  return filteredJobs.value.map(job => getTranslatedCompany(job))
})

const resultsCount = computed(() => translatedFilteredJobs.value.length)

const selectedJob = computed(() => {
  const job = businessNetworkJobs.find((job) => job.id === openId.value)
  if (!job) return null
  locale.value // Force reactivity on language change
  return getTranslatedCompany(job)
})

const toggleOpen = (id) => {
  openId.value = openId.value === id ? null : id
}

const closeDetails = () => {
  openId.value = null
}
</script>

<template>
  <header class="relative min-h-156 w-screen overflow-hidden">
    <!-- Baggrundsvideo (loop bag overlay) -->
    <div class="absolute inset-0">
      <video
        class="absolute left-1/2 top-1/2 h-[120%] w-[220%] -translate-x-1/2 -translate-y-1/2 object-cover"
        autoplay
        muted
        loop
        playsinline
      >
        <source src="/src/assets/videoes/Videoloop2.mp4" type="video/mp4" />
      </video>
    </div>
    <!-- Blå overlay -->
    <div class="absolute w-full h-full bg-primary-darkest/80"></div>

    <div class="absolute inset-0 z-10 flex items-end">
      <div class="grid w-full grid-cols-12 gap-4 px-8 pb-16 lg:pb-20">
        <div class="col-span-12 flex flex-col justify-end text-neutral-light lg:col-span-8 lg:col-start-2">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-light/70">{{ $t('jobportal.subtitle') }}</p>
          <h1 class="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl text-white">{{ $t('jobportal.title') }}</h1>
          <p class="mt-5 max-w-2xl text-sm leading-7 text-neutral-light/85 sm:text-base">
            {{ $t('jobportal.description') }}
          </p>
        </div>
      </div>
    </div>
  </header>
  <main class="w-full bg-white">
    <section class="grid grid-cols-12 gap-4 px-8 py-10 bg-primary-light/10">
      <div class="col-start-2 col-end-12">
        <div class="flex flex-col gap-4">
          <label class="text-sm font-light text-primary-darkest" for="job-search">{{ $t('jobportal.searchLabel') }}</label>
          <div class="flex w-full items-center gap-3">
            <input
              id="job-search"
              v-model="searchQuery"
              type="text"
              :placeholder="$t('jobportal.searchPlaceholder')"
              class="w-full border border-primary-darkest/20 bg-white px-5 py-3 text-primary-darkest shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>
          <p class="uppercase text-sm font-light text-primary-darkest/70">{{ resultsCount }} {{ $t('jobportal.results') }}</p>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-12 gap-4 px-8 py-10 bg-primary-light/10">
      <div class="col-start-2 col-end-12">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <article
            v-for="job in translatedFilteredJobs"
            :key="job.id"
            class="border-primary-darkest/10 bg-white p-5 shadow-sm transition hover:shadow-md flex gap-4"
          >
            <img
              :src="getJobLogo(job)"
              :alt="`${job.company} logo`"
              class="h-12 w-12 rounded-full bg-neutral-light p-2 shrink-0 object-contain"
              loading="lazy"
              decoding="async"
              @error="handleLogoError"
            />
            <div class="min-w-0 flex flex-col">
              <h3 class="line-clamp-2 text-base font-semibold text-primary-darkest">{{ job.title }}</h3>
              <p class="text-sm font-light text-primary-darkest/70">{{ job.company }} - {{ $t('jobportal.location') }}: {{ job.location }}</p>
              <div class="flex-1"></div>
              <button
                type="button"
                class="text-sm font-semibold mt-2 text-primary-darkest hover:text-primary-light self-start"
                @click="toggleOpen(job.id)"
                :aria-expanded="openId === job.id"
              >
                {{ openId === job.id ? $t('jobportal.hideDetails') : $t('jobportal.readMore') }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>

  <div
    v-if="selectedJob"
    class="fixed inset-0 z-50 flex items-center justify-center bg-primary-darkest/70 px-6 py-4 overflow-y-auto"
    @click.self="closeDetails"
    role="dialog"
    aria-modal="true"
  >
    <div class="w-full max-w-2xl bg-white p-8 shadow-xl my-auto">
      <!-- Header med logo og luk-knap -->
      <div class="flex items-start justify-between gap-6 pb-6 border-b border-primary-darkest/10">
        <div class="flex items-center gap-4">
          <img
            :src="getJobLogo(selectedJob)"
            :alt="`${selectedJob.company} logo`"
            class="h-16 w-16 rounded-full bg-neutral-light p-2 shrink-0 object-contain"
            loading="lazy"
            decoding="async"
            @error="handleLogoError"
          />
          <div>
            <h2 class="text-2xl font-bold text-primary-darkest">{{ selectedJob.title }}</h2>
            <p class="text-sm font-light text-primary-darkest/70 mt-1">
              {{ selectedJob.company }} • {{ selectedJob.location }}
            </p>
          </div>
        </div>
        <button
          type="button"
          class="text-lg font-semibold text-primary-darkest/70 hover:text-primary-darkest shrink-0"
          @click="closeDetails"
        >
          ✕
        </button>
      </div>

      <!-- Beskrivelse -->
      <div class="mt-6">
        <h3 class="text-sm font-semibold text-primary-darkest/60 uppercase tracking-wide mb-2">{{ $t('jobportal.aboutOrganization') }}</h3>
        <p class="text-base font-light text-primary-darkest/80 leading-relaxed">
          {{ selectedJob.description }}
        </p>
      </div>

      <!-- Fokusområder -->
      <div class="mt-6">
        <h3 class="text-sm font-semibold text-primary-darkest/60 uppercase tracking-wide mb-3">{{ $t('jobportal.focusAreas') }}</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(area, index) in selectedJob.focusAreas"
            :key="index"
            class="inline-block rounded-full bg-primary-light/20 px-4 py-2 text-sm font-semibold text-primary-base"
          >
            {{ area }}
          </span>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="mt-8 flex flex-wrap gap-3 pt-6 border-t border-primary-darkest/10">
        <a
          v-if="selectedJob.website && selectedJob.website !== '#'"
          :href="selectedJob.website"
          target="_blank"
          rel="noopener noreferrer"
          class=" bg-primary-darkest px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-base transition"
        >
          {{ $t('jobportal.website') }}
        </a>
        <button
          type="button"
          class="border border-primary-darkest/30 px-6 py-2.5 text-sm font-semibold text-primary-darkest hover:border-primary-darkest transition"
        >
          {{ $t('jobportal.contactOrganization') }}
        </button>
      </div>
    </div>
  </div>
</template>
