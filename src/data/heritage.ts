export interface Verse {
  ref: string;
  sanskrit: string;
  translit: string;
  translation: string;
  translator: string;
  context: string;
  application: string;
  sourceUrl: string;
}

export const VERSES: Verse[] = [
  {
    ref: 'Bhagavad Gītā 2.47',
    sourceUrl: 'https://www.gitasupersite.iitk.ac.in/srimad?field_chapter_value=2&field_nsutra_value=47&language=dv',
    sanskrit:
      'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    translit:
      'karmaṇy-evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo \u2019stv akarmaṇi',
    translation:
      'Your right is to action alone, never to its fruits. Let not the fruits of action be your motive, nor let your attachment be to inaction.',
    translator: 'English rendering after Swami Gambhirananda, Bhagavad Gītā with Śaṅkara\u2019s commentary (Advaita Ashrama).',
    context:
      'Spoken in the second chapter, as Krishna responds to Arjuna\u2019s collapse of resolve. The verse addresses the agent\u2019s relationship to results, and explicitly rejects inaction as an escape.',
    application:
      'Contemporary learning application: evaluate the quality of your reasoning and preparation, which you control, separately from the outcome, which you do not. This is a reading for practice — not a claim that consequences are morally irrelevant.',
  },
  {
    ref: 'Bhagavad Gītā 2.48',
    sourceUrl: 'https://www.gitasupersite.iitk.ac.in/srimad?field_chapter_value=2&field_nsutra_value=48&language=dv',
    sanskrit:
      'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय ।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥',
    translit:
      'yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate',
    translation:
      'Established in yoga, perform actions, O Dhanañjaya, abandoning attachment, remaining the same in success and failure; this evenness is called yoga.',
    translator: 'English rendering after Swami Gambhirananda (Advaita Ashrama).',
    context:
      'Immediately following 2.47, the verse defines yoga here as samatva — evenness of mind — rather than withdrawal from activity.',
    application:
      'Contemporary learning application: a good decision can still produce a bad outcome. Keeping a record of reasoning allows you to learn from process rather than from luck.',
  },
  {
    ref: 'Bhagavad Gītā 3.19',
    sourceUrl: 'https://www.gitasupersite.iitk.ac.in/srimad?field_chapter_value=3&field_nsutra_value=19&language=dv',
    sanskrit:
      'तस्मादसक्तः सततं कार्यं कर्म समाचर ।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥',
    translit:
      'tasmād asaktaḥ satataṁ kāryaṁ karma samācara\nasakto hy ācaran karma param āpnoti pūruṣaḥ',
    translation:
      'Therefore, always perform unattached the action that is to be done; for a person performing action without attachment attains the highest.',
    translator: 'English rendering after Swami Gambhirananda (Advaita Ashrama).',
    context:
      'From the third chapter (karma-yoga), where the Gītā argues that abstention from action is neither possible nor automatically free of consequence.',
    application:
      'Contemporary learning application: treat non-decision as a decision. If you abstain, justify the abstention with the same rigour you would demand of an action.',
  },
];

export interface HeritageItem {
  id: string;
  title: string;
  tamil?: string;
  kicker: string;
  body: string[];
  note: string;
}

export const TAMIL_SECTIONS: HeritageItem[] = [
  {
    id: 'villibharatam',
    title: 'Villibhāratam',
    tamil: 'வில்லிபாரதம்',
    kicker: 'A Tamil rendering of the epic, c. 14th\u201315th century',
    body: [
      'Villiputtūrār\u2019s Villibhāratam is the best-known Tamil version of the Mahābhārata, composed in verse and traditionally dated to around the fourteenth or fifteenth century. It is a literary rendering rather than a word-for-word translation of the Sanskrit text.',
      'The work condenses, reorders and re-voices episodes of the Sanskrit epic for a Tamil poetic tradition with its own conventions of metre, simile and emotional register. Scholars of Tamil literature generally read it as a creative adaptation within the broader family of regional Mahābhāratas.',
      'For a decision-making platform, the significance is methodological: the same dilemma, retold in a different language and literary culture, foregrounds different considerations. Comparing retellings is itself a lesson in how framing shapes judgement.',
    ],
    note: 'Verified Tamil excerpts are not reproduced here because reliable critical editions with clear attribution were not available to this build. Readers should consult a scholarly edition of Villibhāratam rather than rely on unattributed online text.',
  },
  {
    id: 'draupadi',
    title: 'Draupadi Amman Traditions',
    tamil: 'திரௌபதி அம்மன் வழிபாடு',
    kicker: 'Living worship and community memory',
    body: [
      'In many parts of Tamil Nadu and in Tamil diaspora communities, Draupadī is venerated as a goddess — Draupadi Amman — with her own temples, festival calendars and ritual specialists.',
      'Festivals associated with these temples often extend over days or weeks and include recitation of Mahābhārata episodes, dramatic enactment, and ritual practices such as firewalking in some local traditions. Practices vary significantly between regions and temples.',
      'These traditions show the epic functioning not as a closed historical text but as a living framework through which communities interpret justice, injustice, endurance and obligation.',
    ],
    note: 'Practices described here vary by locality. This summary is general and should not be taken as a description of any single temple\u2019s ritual.',
  },
  {
    id: 'therukoothu',
    title: 'Therukoothu',
    tamil: 'தெருக்கூத்து',
    kicker: 'Street theatre as transmission',
    body: [
      'Therukoothu — literally "street performance" — is a Tamil folk theatre form in which performers enact episodes, many of them drawn from the Mahābhārata, through all-night performances combining song, dialogue, percussion and stylised makeup and costume.',
      'Performances are frequently linked to temple festivals, including those of Draupadi Amman, and the episodes chosen often carry strong moral and emotional charge.',
      'Because the form is oral and performative, each enactment interprets as well as transmits. The audience encounters not a fixed script but a repeatedly re-argued epic.',
    ],
    note: 'Therukoothu traditions differ between troupes and districts; the form continues to be practised and documented by cultural institutions in Tamil Nadu.',
  },
  {
    id: 'literary',
    title: 'Tamil Literary Heritage',
    tamil: 'தமிழ் இலக்கிய மரபு',
    kicker: 'Adaptations, allusions and later interpretations',
    body: [
      'The relationship between Tamil literature and the Mahābhārata takes several distinct forms, and conflating them produces bad history.',
      'Direct adaptation: works such as Villibhāratam retell the narrative in Tamil verse. Allusion: Tamil poetry across periods references epic characters and episodes without retelling them. Performance transmission: forms such as Therukoothu carry episodes through enactment. Later interpretation: modern Tamil writers and scholars have re-read the epic through contemporary ethical and political questions.',
      'Tamil literary tradition also possesses its own major ethical corpus, most famously the Tirukkuṟaḷ, which addresses conduct, governance and judgement independently of the Mahābhārata. It should not be presented as part of the epic tradition.',
    ],
    note: 'Classification matters: an adaptation is not a translation, and an allusion is not a source.',
  },
];

export const COMPARATIVE_NOTE =
  'A side-by-side reading interface requires verified source text with clear editorial attribution in each language. Where such text was not available for this build, we show the structure of the comparison and the Gītā passages that could be verified, rather than fabricating excerpts.';


export interface HeritageReference {
  title: string;
  institution: string;
  description: string;
  url: string;
  area: 'Epic text' | 'Bhagavad Gītā' | 'Tamil literature' | 'Performance traditions';
}

// Curated further-reading links. These are research starting points, not a claim
// that every item was used to author every question or interpretation in VYŪHA.
export const HERITAGE_REFERENCES: HeritageReference[] = [
  {
    title: 'Mahābhārata: Critical Edition research',
    institution: 'Bhandarkar Oriental Research Institute (BORI)',
    description: 'Institutional information about the scholarly Critical Edition and Mahābhārata research.',
    url: 'https://bori.ac.in/department/mahabharata/',
    area: 'Epic text',
  },
  {
    title: 'Electronic text of the Mahābhārata Critical Edition',
    institution: 'BORI Critical Edition electronic text project',
    description: 'A searchable electronic text useful for locating epic passages; check the edition and passage details when citing.',
    url: 'https://bombay.indology.info/mahabharata/welcome.html',
    area: 'Epic text',
  },
  {
    title: 'Gītā Supersite',
    institution: 'Indian Institute of Technology Kanpur',
    description: 'Verse-by-verse Bhagavad Gītā text with multiple translations and commentaries.',
    url: 'https://www.gitasupersite.iitk.ac.in/',
    area: 'Bhagavad Gītā',
  },
  {
    title: 'Tamil Virtual Academy',
    institution: 'Tamil Virtual Academy',
    description: 'An institutional starting point for Tamil language, literature, and learning resources.',
    url: 'https://www.tamilvu.org/en/home',
    area: 'Tamil literature',
  },
  {
    title: 'Literary elements in Villi Bharatham',
    institution: 'International Research Journal of Tamil',
    description: 'A research article to consult for literary discussion of the Tamil Mahābhārata tradition; read the article before using it to support a specific claim.',
    url: 'https://irjt.iorpress.org/index.php/irjt/article/view/1669',
    area: 'Tamil literature',
  },
  {
    title: 'Mahābhārata retellings and Tamil folk performance',
    institution: 'Bodh: International Journal of Research in Humanities',
    description: 'A research article concerning folk-performance traditions and Mahābhārata narratives. It represents a scholarly perspective, not every local practice.',
    url: 'https://bodhijournals.com/index.php/bijrhas/article/view/452',
    area: 'Performance traditions',
  },
];
