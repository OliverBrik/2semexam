// Importer alle nyheds-billeder
import img1 from '../assets/news-images/news-01-onboarding.png'
import img2 from '../assets/news-images/news-3-gwyn.jpg'
import img3 from '../assets/news-images/news-03-toender-erhvervsraad.png'
import img4 from '../assets/news-images/news-04-tilflytter-interview.png'
import img5 from '../assets/news-images/news-05-toender-erhvervsraad-interview.png'
import img6 from '../assets/news-images/news-06-andritz-onboarding.png'
import img7 from '../assets/news-images/news-07-brauhaus-eutin.jpg'
import img8 from '../assets/news-images/news-08-international-rekruttering.jpg'
import img9 from '../assets/news-images/news-09-graensen-bragte-os-videre.jpg'
import img10 from '../assets/news-images/news-10-starte-virksomhed.png'
import img11 from '../assets/news-images/news-11-happy-family-happy-life.png'
import img12 from '../assets/news-images/news-12-business-kolding-event.png'

// Alle nyheder med titel, resumé, kategori og brødtekst. Bruges både i karusel og liste
export const allNews = [
  {
    id: 1,
    title: 'Når onboarding bliver helhed: Tryghed for internationale medarbejdere',
    summary: 'Et stærkt onboarding-forløb hjælper internationale medarbejdere med at falde til både på jobbet og i hverdagen.',
    category: 'Interview',
    badge: 'NYHED!',
    image: img1,
    youtube: 'a11VoY2aQfY',
    body: 'Hvordan onboarder man medarbejdere fra 19 forskellige nationaliteter – og sikrer, at de ikke bare falder til på jobbet, men også i lokalsamfundet? Andritz Feed & Biofuel har sat onboarding højt på dagsordenen og arbejder målrettet med alt fra buddy‑ordninger og ledertræning til social og kulturel integration. Resultatet er en helhedsorienteret tilgang med praktisk støtte til bolig, mentorordninger, faglig sparring og sociale aktiviteter, der kan inspirere andre virksomheder.'
  },
  {
    id: 2,
    title: 'Fra udlænding til integreret: erfaringer fra hverdagen i Danmark',
    summary: 'At flytte til et nyt land handler ikke kun om arbejde, men også om at føle sig hjemme og blive en del af fællesskabet.',
    category: 'Interview',
    badge: '5 MÅNEDER SIDEN',
    image: img4,
    youtube: 'hnbAzHQNnik',
    body: '<p>“Jeg føler mig godt tilpas både på arbejdet og i min fritid. Men nogle kulturelle ting kan man ikke erstatte, og det er vigtigt at holde kontakten til sin egen kultur. Heldigvis er folk her åbne og nysgerrige – de spørger til, hvordan jeg havde det hjemme, og det gør det nemmere at føle sig inkluderet.”</p>\n\n<p>Integration kræver mere end et arbejde – det kræver netværk og sprog. At få støtte til sprogundervisning, at møde nye mennesker både på og uden for arbejdspladsen og at have adgang til lokale netværksgrupper hjælper udenlandske medarbejdere med at føle sig hjemme hurtigere.</p>\n\n<p>“Når arbejdspladsen hjælper med alt fra arbejds- og opholdstilladelse til bolig og transport, bliver starten meget nemmere, og man kan fokusere på sit arbejde og sit liv her.”</p>\n\n<p>Nøglen til succes: sprog, netværk og støtte fra arbejdspladsen. Små gestusser kan gøre en stor forskel for, at nye kollegaer føler sig velkomne – både på arbejdet og i livet generelt.</p>'
  },
  {
    id: 3,
    title: 'Se interviewet med Gwyn Nissen, Chefredakteur for Der Nordschleswiger',
    summary: 'Et interview om det grænseoverskridende samarbejde og de historier, der binder regionen sammen.',
    category: 'Interview',
    badge: '6 MÅNEDER SIDEN',
    image: img2,
    youtube: 'gVvF2_e7DFE',
    body: 'Gwyn Nissen giver et skarpt blik på tilflytning, integration og arbejdskraft i grænseregionen. Interviewet fremhæver behovet for bedre koordination mellem kommuner, erhvervsliv og lokale aktører, samt at hele familien skal hjælpes for at sikre langsigtet trivsel. Videoen peger også på potentialet i regionens boligmarked, natur og nærhed til større byer.'
  },
  {
    id: 4,
    title: 'Business DE-DK: grænseløst samarbejde',
    summary: 'Virksomheder, organisationer og mennesker kan skabe værdi sammen på tværs af grænsen gennem fælles initiativer.',
    category: 'Indsigt',
    badge: '7 MÅNEDER SIDEN',
    image: img3,
    body: '<h3>Business DE-DK</h3>\n<p>Business DE-DK hvor Sønderjylland og Slesvig-Holsten tackler udfordringen med mangel på arbejdskraft på begge sider af grænsen. Projektet ledes af Tønder Kommune og støttes af EU-midler.</p>\n\n<h4>Erhvervssamarbejde er, hvad vi forstår</h4>\n<p>Vi bygger bro og flytter fokus fra udfordringer til løsninger, vi skaber klarhed i komplekse grænseoverskridende sammenhænge. Fra ambitioner til konkrete resultater. Beregninger viser, at der i de kommende år vil mangle omkring 130.000 faglærte i Danmark og ca. 180.000 i Slesvig-Holsten. For at imødekomme denne udfordring samarbejder vi med store aktører som erhvervsfonde, universiteter og jobcentre.</p>\n\n<h4>Dialog og netværk er, hvad vi gør</h4>\n<p>Business DE-DK skaber platforme for læring og erfaringsudveksling på tværs af lande. Vi besøger best practices, inspireres af eksisterende løsninger og faciliterer dialog mellem virksomheder, politikere og organisationer. Gennem workshops, netværksmøder og online løsninger bringer vi aktører sammen for at udvikle konkrete, grænseoverskridende initiativer.</p>\n\n<h4>Data og viden er vores fundament</h4>\n<p>Vi indsamler, strukturerer og formidler data om grænseregionens erhvervsliv, initiativer og muligheder – frit tilgængeligt via vores mediekanal. Vores research giver et samlet overblik over behov og potentialer, så alle aktører kan træffe bedre beslutninger, samarbejde mere effektivt og skabe værdi for regionen.</p>\n\n<h4>Grænseløs værdi er, hvad vi tilbyder</h4>\n<p>Vi etablerer et Cross-border business-netværk med erhvervsfolk, konsulenter, professorer og beslutningstagere, hvor viden deles, relationer skabes, og nye samarbejder tager form. Samtidig undersøger vi mulighederne for et Cross-border business-råd, der kan diskutere regionens udfordringer, foreslå løsninger og fremme en langsigtet, bæredygtig udvikling.</p>\n\n<h4>En lys fremtid</h4>\n<p>Business DE-DK er et langtidsprojekt, der løber frem til 2027, men allerede nu er fundamentet lagt, og viljen til samarbejde er tydelig. Vi vil ikke blot løse arbejdskraftmanglen; vi vil skabe en region, der bliver centrum for innovation, vækst og samarbejde – en grænseoverskridende model, hvor virksomheder og mennesker trives. Her hører du til – og her bliver grænser kun en mulighed.</p>\n\n<p>Er du interesseret i at medvirke i vores netværksidéologi, så skriv dig op.</p>'
  },
  {
    id: 5,
    title: 'Tønder Erhvervsråd',
    summary: 'Styrkelse af grænseoverskridende samarbejde for økonomisk vækst og fælles udvikling.',
    category: 'Interview',
    badge: '7 MÅNEDER SIDEN',
    image: img5,
    youtube: '1k1CTo3FGjs',
    youtube2: 'lpEReNTKuus',
    body: '<h3>Styrkelse af grænseoverskridende samarbejde for økonomisk vækst</h3>\n<p>Peter Engel, erhvervsdirektør hos Tønder Erhvervsråd, forklarer vigtigheden af det grænseoverskridende samarbejde mellem Danmark og Tyskland. Med over 300 medlemsvirksomheder fokuserer erhvervsrådet på at støtte de urbane erhvervssektorer og fremme projekter, der skaber netværk mellem virksomheder på begge sider af grænsen.</p>\n\n<p>I sit interview fremhæver Engel udfordringer som sprogbarrierer og kulturelle forskelle, men understreger samtidig de økonomiske fordele. Initiativer som “Fit for Jobs” har vist succes ved at mobilisere arbejdskraft på tværs af grænsen.</p>\n\n<p>Engels vision indebærer udbygning af netværk og overvindelse af barrierer for at skabe synergier mellem landene. Gennem innovative projekter og tæt samarbejde skal der findes løsninger på manglen på arbejdskraft og skabes økonomisk vækst.</p>',
    contactTitle: 'Erhvervsdirektør',
    contactName: 'Peter Engel-Andreasen',
    contactEmail: 'peeng@toender.dk',
    contactPhone: '+45 30 65 60 60'
  },
  {
    id: 6,
    title: 'Succesfuld onboarding og international rekruttering hos ANDRITZ Feed & Biofuel',
    summary: 'Et konkret eksempel på hvordan virksomheder kan arbejde struktureret med onboarding og rekruttering på tværs af grænsen.',
    category: 'Interview',
    badge: '7 MÅNEDER SIDEN',
    image: img6,
    body: '<h3>Succesfuld onboarding og international rekruttering hos ANDRITZ Feed & Biofuel</h3>\n<p>Virksomheden producerer store maskiner til fiskefoder og biofuelprodukter og har ambitioner om at udvikle komplette A-Z-processer - et tydeligt tegn på vækst og teknologisk udvikling.</p>\n\n<p>Medarbejdere fra over 20 nationaliteter bidrager med nye perspektiver og styrker innovationen. Rekruttering og onboarding starter allerede ved første kontakt med praktisk støtte til boligsøgning, kulturintroduktion og en guide til dansk arbejdsplads. Den første dag byder på møde med leder, introduktion til teamet og opsætning af IT, samt en mentorordning, faglig sparring og social integration.</p>\n\n<p>Sociale aktiviteter som teambuilding, julefrokost og familiearrangementer sikrer trivsel og fællesskab, mens fleksibel sprogbrug inkluderer alle i dagligdagen. Tillid, tålmodighed og forståelse for kulturelle forskelle er kernen i virksomhedens succesfulde onboarding og internationale samarbejde.</p>\n\n<hr>\n<p><strong>Tysk version:</strong></p>\n<h4>Erfolgreiches Onboarding und internationale Rekrutierung bei ANDRITZ Feed & Biofuel</h4>\n<p>Bei ANDRITZ Feed & Biofuel gehen Innovation, Technologie und Vielfalt Hand in Hand. Das Unternehmen produziert große Maschinen für Fischfutter und Biokraftstoffe und arbeitet gezielt an der Entwicklung kompletter A-Z-Prozesse - ein klares Signal für Wachstum und technologischen Fortschritt. Mitarbeiterinnen und Mitarbeiter aus mehr als 20 Nationen bringen neue Perspektiven ein, die Innovation fördern und ein dynamisches Arbeitsumfeld schaffen. Das Recruiting und Onboarding beginnen bereits beim ersten Kontakt: Internationale Fachkräfte erhalten praktische Unterstützung bei der Wohnungssuche, eine kulturelle Einführung sowie einen Leitfaden zum dänischen Arbeitsumfeld.</p>\n\n<p>Der erste Arbeitstag ist geprägt von einer herzlichen Begrüßung: einem Gespräch mit der Führungskraft, der Vorstellung im Team und der Einrichtung der IT. Darüber hinaus werden ein Mentorenprogramm, fachlicher Austausch und soziale Integration angeboten, damit sich neue Kolleginnen und Kollegen schnell wohlfühlen.</p>\n\n<p>Das Wohlbefinden und der Zusammenhalt werden durch soziale Aktivitäten wie Teambuilding, Weihnachtsfeiern und Familienveranstaltungen gestärkt. Eine flexible Sprachpraxis stellt sicher, dass sich alle im Arbeitsalltag einbezogen fühlen. Vertrauen, Geduld und Respekt für kulturelle Unterschiede bilden den Kern des erfolgreichen Onboardings und der internationalen Zusammenarbeit bei ANDRITZ.</p>'
  },
  {
    id: 7,
    title: 'Grænseoverskridende løsninger mod manglen på kvalificeret arbejdskraft.',
    summary: 'Et møde i Brauhaus Eutin samlede virksomheder og eksperter om løsninger på mangel på arbejdskraft.',
    category: 'Resultat',
    badge: '7 MÅNEDER SIDEN',
    image: img7,
    youtube: 's98OJeTzgVM',
    body: 'Omkring 40 virksomheder og eksperter mødtes i Brauhaus Eutin for at dele erfaringer om fagkræftemangel. Deltagerne fremhævede praktiske løsninger: kreativ rekruttering, tættere samarbejde mellem uddannelse og erhverv, samt støtteordninger for tilflyttere. Workshoppen understregede vigtigheden af velkomstkultur og integrationsindsatser.'
  },
  {
    id: 8,
    title: 'Hvordan kommer man i gang med international rekruttering?',
    summary: 'Workshoppen giver virksomheder konkrete værktøjer til at tiltrække og integrere internationale medarbejdere.',
    category: 'Indsigt',
    badge: '7 MÅNEDER SIDEN',
    image: img8,
    body: '<h3>Hvordan kommer man i gang med international rekruttering?</h3>\n<p>Det blev delt under et indholdsrigt workshop i Kolding - arrangeret af Business Kolding som en del af projektet Business in DE-DK. Workshoppen bestod af et oplæg om, hvorfor Danmark er attraktivt set udefra, og hvilke barrierer virksomheder typisk møder, når de tager de første skridt mod at ansætte internationale kolleger.</p>\n\n<p>Herefter blev der skabt rum for gruppedialog, hvor deltagerne udvekslede erfaringer og refleksioner på tværs af brancher og perspektiver.</p>\n\n<p>Nogle af de centrale spørgsmål, der blev drøftet, var blandt andet:</p>\n<ul>\n<li>Hvordan lærer kandidaten dansk - og hvem har ansvaret?</li>\n<li>Hvad hvis nogle medarbejdere er usikre på engelsk - kan det give mening med opkvalificering?</li>\n<li>Hvordan håndteres boligspørgsmålet - midlertidigt, møbleret eller permanent?</li>\n<li>Og er det virksomhedens ansvar?</li>\n</ul>\n\n<p>Gitte Gram Davidsen satte en vigtig pointe på ord med bemærkningen:</p>\n<p><em>"Der findes ikke én løsning, der passer til alle."</em></p>\n\n<p>Men der blev også peget på, at det er muligt at komme i gang - uden at miste overblikket. Der blev delt fem konkrete råd til virksomheder, som ønsker at tage hul på arbejdet med international rekruttering:</p>\n<ul>\n<li>Undersøg barriererne i hele organisationen - HR, mellemledere og driften har ofte forskellige perspektiver.</li>\n<li>Lyt åbent og aktivt til medarbejdernes input.</li>\n<li>Beslut, hvilke barrierer der skal arbejdes med først - og vær realistiske i forhold til ressourcer og kapacitet.</li>\n<li>Kortlæg, hvilke ressourcer virksomheden allerede har - og hvad der kan tilføres via fx kommune eller eksterne partnere.</li>\n<li>Prioritér indsatsen - hvis international arbejdskraft er et strategisk valg, skal det også afspejles i den daglige drift.</li>\n</ul>'
  },
  {
    id: 9,
    title: 'Grænsen bremsede os ikke – den bragte os videre',
    summary: 'Community-mødet i Nibøl samlede danske og tyske virksomheder om samarbejde og nye muligheder.',
    category: 'Resultat',
    badge: '7 MÅNEDER SIDEN',
    image: img9,
    body: '<h3>Grænsen bremsede os ikke - den bragte os videre</h3>\n<p>Med stærke oplæg, ærlige fortællinger og konkrete eksempler fra virksomheder, der arbejder på tværs af grænsen, blev dagen både lærerig og værdifuld. Deltagerne fik indblik i, hvordan man håndterer myndighedskrav, overkommer grænseoverskridende udfordringer og åbner dørene til nye markeder og samarbejder.</p>\n\n<p>Netværket blev styrket, nye relationer blev skabt, og flere deltagere gik derfra med ny inspiration og konkrete idéer til fremtidige projekter.</p>\n\n<p>Som projektleder Lewis C. Bardt sagde:</p>\n<p><em>"Vi samler viden, mennesker og muligheder - det er her, fremtiden formes."</em></p>\n\n<p>Tak til alle, der deltog og bidrog til et stærkt og engageret fællesskab.</p>\n\n<p>Vil du med næste gang? Så følg med her på siden.</p>\n\n<p>Tak til arrangørerne Wirtschaftsförderung Nordfriesland af eventet og en stor tak til alle, der deltog og bidrog til et stærkt og engageret fællesskab.</p>'
  },
  {
    id: 10,
    title: 'Sådan starter du virksomhed i Danmark som tilflytter',
    summary: 'Praktiske trin og nyttige råd til internationale tilflyttere, der vil etablere sig og komme i gang.',
    category: 'Indsigt',
    badge: '7 MÅNEDER SIDEN',
    image: img10,
    body: '<h3>Sådan starter du virksomhed i Danmark som tilflytter</h3>\n<p>Ud over CPR-nummer og MitID kræves det, at man har en fast adresse i Danmark. Afhængigt af virksomhedsformen kan der også være krav om kapitalindskud. Det er desuden vigtigt at sætte sig ind i de danske regler for regnskab, skat, arbejdsmarkedsbidrag og eventuelle specifikke tilladelser. For eksempel kræver virksomheder inden for sundhed, byggeri eller fødevareproduktion ofte særlige licenser.</p>\n\n<p>Hvis virksomhedens omsætning overstiger 50.000 kr. årligt, skal den momsregistreres hos SKAT. Tilflyttere, der ønsker at ansætte medarbejdere, skal desuden registrere sig som arbejdsgiver hos SKAT og indbetale arbejdsmarkedsbidrag.</p>\n\n<p>Når CPR-nummeret er på plads, skal der vælges en virksomhedsform - for eksempel enkeltmandsvirksomhed, anpartsselskab (ApS) eller aktieselskab (A/S) - og registreres via virk.dk. For at kunne håndtere virksomhedens økonomi og betalinger skal der også åbnes en dansk bankkonto.</p>\n\n<h4>Ressourcer og vejledning på flere sprog</h4>\n<p>Tønder Erhvervsråd tilbyder vejledning og henviser til et netværk af professionelle konsulenter, herunder advokater, revisorer og business coaches, der kender de danske erhvervslove. Disse konsulenter kan guide tilflyttere gennem processen på både tysk og engelsk - fra registrering af virksomhed og moms til håndtering af skatteforhold og andre administrative opgaver.</p>\n\n<p>Det er desuden en stor fordel for tyske tilflyttere at lære dansk, især for at kunne interagere med offentlige myndigheder og lokale kunder. Danmark er et digitalt avanceret land, hvor mange myndigheder tilbyder online-tjenester. Selvom flere af disse tjenester er tilgængelige på engelsk, kan det være en fordel at få hjælp, hvis der opstår sproglige barrierer. Mange kommuner tilbyder gratis sprogkurser for nytilkomne, hvilket kan være en stor støtte.</p>\n\n<p>Selvom tyske tilflyttere ofte kan klare sig med engelsk i erhvervslivet, vil det være en stor fordel at lære dansk - især for at kunne navigere effektivt i de danske administrative systemer og regler. Dette gælder særligt i forhold til virksomhedens oprettelse og skatteforpligtelser, hvor grundig indsigt i de danske krav er afgørende.</p>'
  },
  {
    id: 11,
    title: 'Happy family, happy life – en nøgle til international fastholdelse',
    summary: 'Et oplæg om hvordan familieliv, trivsel og helhedstænkning spiller ind på fastholdelse af internationale medarbejdere.',
    category: 'Indsigt',
    badge: '7 MÅNEDER SIDEN',
    image: img11,
    body: '<h3>Happy family, happy life - en nøgle til international fastholdelse</h3>\n<p>Sprog, kultur og praktiske forhold spænder ofte ben for både rekruttering og fastholdelse i grænseregionen.</p>\n\n<p>Til et inspirerende oplæg med Gitte Gram Davidsen fra Work-live-stay, blev det tydeligt, hvor mange lag der er i denne udfordring:</p>\n<p><em>"Selvom det kan være en strategisk fordel at ansætte internationale talenter, skal vi huske, at vi taler om mennesker. Mennesker med familier, som skal tilpasse sig en ny kultur, et nyt sprog og et nyt arbejdsmiljø."</em></p>\n\n<p>En deltager pointerede:</p>\n<p><em>"Mange kolleger er bange for, at de ikke kan kommunikere med en international medarbejder. Selv på engelsk kan sproget blive en barriere."</em></p>\n\n<p>Sprog og kultur er gennemgående temaer. Gitte sagde:</p>\n<p><em>"Arbejdspladskulturen er meget forskellig fra land til land. Det kræver en indsats at hjælpe både de internationale medarbejdere og de danske kolleger til at forstå hinanden."</em></p>\n\n<p>De seks typiske barrierer, som Gitte præsenterede fra sit arbejde med danske virksomheder, er:</p>\n<ul>\n<li>Praktiske udfordringer (arbejdstilladelser, skat, CPR mv.)</li>\n<li>Begrænsede HR-ressourcer</li>\n<li>Sprog</li>\n<li>Kultur</li>\n<li>Modtagelse</li>\n<li>Tilknytning</li>\n</ul>\n\n<p>Et stærkt budskab fra Gitte var også:</p>\n<p><em>"Vi er vant til at tænke, at faglærte medarbejdere er nogen, vi ansætter for tre til seks måneder og så sender hjem igen. Det skal vi stoppe med. De ønsker også at bygge en karriere og blive dygtigere."</em></p>\n\n<p>Og ikke mindst:</p>\n<p><em>"Happy family, happy life. Hvis vi vil have internationale medarbejdere til at blive, skal vi også skabe gode rammer for deres ægtefæller og familier."</em></p>\n\n<p>Vi holder løbende arrangementer, hvor vi tematiserer emner og barrierer i grænseregionen.</p>\n<p>Vil du inviteres med, så kontakt:</p>',
    contactName: 'Dustin Chwalek',
    contactEmail: 'dusch@toender.dk',
    contactPhone: '+45 24 25 36 70'
  },
  {
    id: 12,
    title: 'Business Kolding: Hvad kræver det at tiltrække kvalificeret arbejdskraft?',
    summary: 'Et oplæg om den største udfordring for mange virksomheder og hvordan den kan tackles i praksis.',
    category: 'Interview',
    badge: '7 MÅNEDER SIDEN',
    image: img12,
    youtube: 'uh5YzQczMw8',
    body: 'Business Kolding dykker ned i tre væksthindringer: grøn omstilling, digitalisering og kompetencemangel. Oplægget præsenterer konkrete tiltag til at tiltrække udenlandsk arbejdskraft, netværkssamarbejde og politiske initiativer, som virksomheder kan bruge i deres rekrutteringsstrategi.'
  },
]
