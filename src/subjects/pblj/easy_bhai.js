// Beginner-first explainer (Bhai / Hinglish). Same shape as easy_en.js.
export default {
'u0-basics': {
  s: 'Java program = instructions ka set, jo "class" (design) aur "object" (us design se bani asli cheez) mein bata hota hai.',
  story: 'Cookie cutter socho bhai. Cutter = design. Usse jitni cookies dabao, sab asli cookies. Ek cutter, bahut saari cookies.',
  words: [['Class', 'Design / saancha, jaise cookie cutter.'], ['Object', 'Us design se bani asli cheez, jaise ek cookie.'], ['Variable', 'Label laga dabba jisme value rakhte ho (naam, number).'], ['Method', 'Object jo kaam kar sakta hai, jaise bake() ya eat().'], ['main()', 'Shuruaat ki jagah. Java yahin se padhna shuru karta hai.']],
  how: ['Pehle class likho, matlab design.', '<code>new</code> likh ke object banao.', 'Object ko values do (name = "Asha").', 'Method call karke object se kaam karwao.'],
  exam: 'Ye exam question nahi hai. Bas class, object, variable, method ye 4 words yaad rakho, har topic mein aayenge.',
  yaad: 'Class = cutter, Object = cookie, Method = cookie kya kar sakti hai.'
},
'u1-jvm': {
  s: 'Java ek baar likho, kisi bhi computer pe chalao, kyunki har computer pe JVM naam ka "Java player" hota hai.',
  story: 'Gaana MP3 mein record kiya. Phone pe chalta hai, laptop pe chalta hai, car mein bhi chalta hai, kyunki sab ke paas MP3 player hai. Gaana same, player alag.',
  words: [['Compiler (javac)', 'Translator jo tera code bytecode mein badalta hai.'], ['Bytecode', 'Java ki "MP3 file": .class file jo har JVM samajhta hai.'], ['JVM', 'Java Virtual Machine: player jo bytecode chalata hai.'], ['JRE', 'JVM + ready libraries. Java CHALANE ke liye kaafi.'], ['JDK', 'JRE + compiler jaise tools. Java LIKHNE ke liye zaroori.']],
  how: ['Tu Hello.java likhta hai.', 'Compiler usko Hello.class (bytecode) bana deta hai.', 'Kisi bhi computer ka JVM bytecode padhta hai.', 'JVM usko us computer ki bhasha mein badal ke chala deta hai.'],
  exam: 'Likho: bytecode platform-independent hai, javac banata hai, JVM usko machine code mein badalta hai → "Write Once, Run Anywhere". Boxes banao: JDK ke andar JRE, JRE ke andar JVM. JVM parts: Class Loader, Memory, Execution Engine.',
  yaad: 'Bytecode = MP3, JVM = player. JDK ⊃ JRE ⊃ JVM.'
},
'u1-oop': {
  s: 'OOP ke 4 bade idea: data chhupao, detail chhupao, code dobara use karo, aur ek naam se alag-alag kaam.',
  story: 'TV remote dekho: andar ka circuit band hai (data chhupa). Tu power dabata hai, electronics nahi jaanta (detail chhupi). Smart TV ka remote bhi remote hi hai, extra buttons ke saath (reuse). "OK" button har screen pe alag kaam karta hai (ek naam, kai kaam).',
  words: [['Encapsulation', 'Data private rakho, sirf safe methods se use karne do.'], ['Abstraction', 'KYA karta hai dikhao, KAISE karta hai chhupao.'], ['Inheritance', 'Nayi class purani class ki saari cheezein le leti hai (extends).'], ['Polymorphism', '"Kai roop": same method naam, alag behaviour.'], ['private', 'Word jo variable ko lock kar deta hai, sirf apni class chhoo sakti hai.']],
  how: ['Variables private karo (encapsulation).', 'Abstract class banao jo sirf kaam ka naam bataye (abstraction).', 'Child classes banao jo usko extend karein (inheritance).', 'Har child apna version likhe (polymorphism).'],
  exam: 'Chaaron ki definition + ek-ek example. 10 marks mein Employee example: abstract Employee, private name, FullTime aur PartTime extend karein, apna calculateSalary() likhein.',
  yaad: 'A PIE: Abstraction, Polymorphism, Inheritance, Encapsulation.'
},
'u1-inherit': {
  s: 'Inheritance matlab child class ko parent class ki cheezein apne aap mil jaati hain.',
  story: 'Tujhe papa ka surname aur ghar milta hai, tune banaya nahi, bas mil gaya. Ek bachche ke do papa hon toh confusion hoga, isliye Java mein sirf ek parent class allowed hai.',
  words: [['extends', 'Keyword jo bolta hai "ye class us class se inherit karti hai".'], ['Parent / superclass', 'Jo class cheezein deti hai.'], ['Child / subclass', 'Jo class cheezein leti hai.'], ['Interface', 'Promises ki list ("ye methods hone chahiye"), andar code nahi.'], ['Diamond problem', 'Do parent ke paas same method ho toh kaunsa use karein? Ye confusion.']],
  how: ['Single: ek parent, ek child.', 'Multilevel: dada → papa → beta.', 'Hierarchical: ek parent, kai bachche.', 'Do parent classes allowed NAHI (diamond problem).', 'Iski jagah interfaces: ek class kai interfaces implement kar sakti hai.'],
  exam: 'Har type ka chhota diagram banao. Likho: classes se multiple inheritance nahi hota diamond problem ki wajah se, interfaces se hota hai.',
  yaad: 'Class ka ek hi parent. Interfaces jitne chahe.'
},
'u1-overload': {
  s: 'Overloading = same naam, alag inputs. Overriding = child class parent ka method apne tareeke se dobara likhti hai.',
  story: 'Overloading: chai stall pe "ek chai", "kam cheeni wali chai", "do chai", sab "chai" order hain par input alag toh result alag. Overriding: mummy ki dal ki recipe, tu apne style mein banata hai. Jo cook kar raha hai uski recipe chalegi.',
  words: [['Method', 'Naam wala kaam, jaise add().'], ['Parameters', 'Method ko diye gaye inputs, brackets ke andar.'], ['Compile time', 'Jab code check aur translate hota hai, chalne se pehle.'], ['Runtime', 'Jab program sach mein chal raha ho.'], ['@Override', 'Label: "main parent ka method dobara likh raha hoon".']],
  how: ['Overloading: ek class mein add(int, int) aur add(int, int, int) likho.', 'Compiler dekhta hai kitne inputs, kis type ke, kis order mein, aur chalne se pehle sahi method chun leta hai.', 'Overriding: parent Animal ka sound(), child Dog apna sound() likhta hai.', 'Chalte waqt Java asli object (Dog) ka version use karta hai.'],
  exam: 'Calculator program 3 add() ke saath. Explain: compiler number, type aur order of parameters se compile time pe chunta hai. Difference table bhi banao.',
  yaad: 'Overloading = input alag. Overriding = recipe alag.'
},
'u1-access': {
  s: 'Access modifiers decide karte hain ki variable ya method ko kaun dekh ya use kar sakta hai.',
  story: 'Teri diary (sirf tu), ghar ka fridge (ghar ke sab), family ka sona (family + bahar shift hue bachche), park ki bench (koi bhi).',
  words: [['private', 'Sirf usi class ke andar.'], ['default', 'Koi keyword nahi. Sirf same package (folder) ke andar.'], ['protected', 'Same package + child classes kahin bhi.'], ['public', 'Sab ke liye, har jagah.'], ['Package', 'Folder jisme related classes rakhte hain.']],
  how: ['Variable ya method se pehle keyword likho.', 'Java check karta hai kaun use kar raha hai.', 'Allowed nahi hai toh code compile hi nahi hoga.'],
  exam: '4 × 4 table banao: rows private, default, protected, public; columns same class, same package, subclass, other package. Tick-cross bharo.',
  yaad: 'Diary → Fridge → Sona → Bench.'
},
'u1-exception': {
  s: 'Exception = program chalte waqt aayi problem. Handle karo toh program chalta rahega, warna crash.',
  story: 'Scooty chala raha hai aur tyre puncture (exception). Stepney hai (catch) toh badlo aur aage badho. Nahi hai toh wahin atak gaye (crash). Ghar pahunch ke lock lagana hamesha hota hai, puncture ho ya na ho (finally).',
  words: [['try', 'Risky code yahan rakho.'], ['catch', 'Gadbad hui toh kya karna hai.'], ['finally', 'Ye code HAMESHA end mein chalega (safai).'], ['throw', 'Khud exception phenkna.'], ['throws', 'Method pe warning: "isme problem aa sakti hai, call karne wala sambhale".']],
  how: ['Java try ke andar ka code chalata hai.', 'Error aaya toh seedha matching catch pe jump.', 'try ka baaki code skip.', 'finally dono case mein chalta hai, program aage badhta hai.'],
  exam: 'Hierarchy banao: Throwable → Error aur Exception; Exception → checked (IOException) aur RuntimeException (unchecked, jaise NullPointerException). try, catch, finally, throw, throws explain karo + throw vs throws aur checked vs unchecked tables.',
  yaad: 'try = chalao, catch = stepney, finally = lock hamesha.'
},
'u1-custom': {
  s: 'Apni khud ki exception bana sakte ho, clear naam ke saath, taaki message bata de kya galat hua.',
  story: 'Voting booth pe 15 saal ka ladka aaya. Bola gaya "18 se kam ho". Ye specific reason hai, vague "error" se kahin clear.',
  words: [['Custom exception', 'Tumhara apna error type, jaise AgeException.'], ['extends Exception', 'Tumhari class ko asli exception bana deta hai.'], ['super(message)', 'Message parent ko deta hai taaki getMessage() dikha sake.'], ['getMessage()', 'Error message ka text deta hai.']],
  how: ['Class banao: <code>class AgeException extends Exception</code>.', 'Constructor mein <code>super(message)</code>.', 'Rule check ki jagah <code>throw new AgeException("Too young")</code>.', 'Method pe <code>throws AgeException</code>.', 'Caller try-catch se pakde aur e.getMessage() print kare.'],
  exam: 'Ye 5 steps + chhota program + output. ATM wala question bhi same, bas InsufficientFundsException.',
  yaad: 'Banao → phenko → batao (throws) → pakdo.'
},
'u2-collections': {
  s: 'Collections = bahut saari cheezein rakhne ke ready-made dabbe, khud banane ki zaroorat nahi.',
  story: 'Ghar mein alag dabbe: numbered register (order zaroori), unique chaabiyon ka dabba (duplicate nahi), bank ki line (pehle aaya pehle gaya), phone contacts (naam → number).',
  words: [['List', 'Order mein items, duplicate chalega (ArrayList, LinkedList).'], ['Set', 'Duplicate allowed nahi (HashSet).'], ['Queue', 'Pehle aaya, pehle gaya.'], ['Map', 'Key → value jodi, jaise naam → number (HashMap).'], ['java.util', 'Package jahan ye sab rehte hain.']],
  how: ['Kaam ke hisaab se dabba chuno: List, Set, Queue ya Map.', 'Banao, jaise <code>new ArrayList&lt;&gt;()</code>.', 'add(), remove(), get() use karo.', 'Badhna, dhoondhna, sort karna Java khud sambhalta hai.'],
  exam: 'Hierarchy tree banao (Collection → List, Set, Queue; Map alag). ArrayList, LinkedList, HashSet, HashMap ko 3-4 line + chhota example.',
  yaad: 'List = register, Set = unique, Queue = line, Map = contacts.'
},
'u2-al-ll': {
  s: 'ArrayList mein position se dhoondhna fast; LinkedList mein beech mein daalna/hatana fast.',
  story: 'Cinema seats (ArrayList): seat 50 pe seedha jao, par seat 3 pe kisi ko bithana hai toh peeche sabko khiskana padega. Haath pakad ke khade log (LinkedList): 50th banda dhoondhne ke liye ek-ek gino, par naya ghusana easy: do log haath chhodo aur pakdo.',
  words: [['Index', 'Item ki position ka number (0 se shuru).'], ['get(i)', 'Position i wala item lao.'], ['Node', 'LinkedList ki ek kadi: item + aage-peeche ka address.']],
  how: ['ArrayList items ko line mein rakhta hai, kisi bhi position pe seedha jump.', 'Beech mein daalo toh baaki sab khiskate hain.', 'LinkedList items ko chain mein rakhta hai.', 'Daalna bas 2 link badalna, par position dhoondhne ke liye chain mein chalna padta hai.'],
  exam: 'Difference table (6-8 rows): structure, get(i) speed, insert/delete speed, memory, kab kya use karein.',
  yaad: 'ArrayList = fast access. LinkedList = fast insert/delete.'
},
'u2-hm-tm': {
  s: 'Dono key → value rakhte hain. HashMap fast par order nahi; TreeMap keys sorted rakhta hai.',
  story: 'HashMap = tera bag: cheez jaldi milti hai par sab bikhra hai. TreeMap = library shelf: books A se Z order mein, thoda slow, hamesha saaf.',
  words: [['Key', 'Label jisse dhoondhte ho (jaise naam).'], ['Value', 'Us key ke andar ka data (jaise number).'], ['Sorted', 'Order mein lage hue, A se Z.'], ['null', 'Khaali, kuch nahi.']],
  how: ['HashMap har key ka hash (calculate kiya address) banata hai.', 'Dhoondhna bahut fast, par order random.', 'TreeMap keys ko sorted tree mein rakhta hai.', 'Thoda slow, par keys hamesha order mein. TreeMap null key nahi leta.'],
  exam: 'Difference table: structure, order, speed, null key, extra methods (TreeMap ke firstKey, lastKey).',
  yaad: 'HashMap = bag (fast, bikhra). TreeMap = shelf (sorted).'
},
'u2-thread-life': {
  s: 'Thread program ke andar ka chhota worker hai. Uski life ke 5 stages hote hain.',
  story: 'Naya employee: hire hua (New) → desk ka wait (Runnable) → desk pe kaam (Running) → chai break ya boss ka wait (Waiting) → retire (Terminated). Retire wala dobara hire nahi hota.',
  words: [['Thread', 'Kaam ka ek raasta. Kai threads = ek saath kai kaam.'], ['start()', 'Thread ko ready karta hai.'], ['run()', 'Thread ka asli kaam.'], ['sleep()', 'Thodi der ruko.'], ['join()', 'Doosre thread ke khatam hone ka wait karo.']],
  how: ['New: thread object bana.', 'Runnable: start() hua, apni baari ka wait.', 'Running: CPU mila, run() chal raha.', 'Waiting: sleep(), wait() ya join() se ruka; phir wapas Runnable.', 'Terminated: run() khatam. Dobara start nahi hoga.'],
  exam: 'Arrows ke saath state diagram banao. Thread banane ke 2 tareeke: Thread extend karo, ya Runnable implement karo (better).',
  yaad: 'New → Runnable → Running → Waiting → Terminated.'
},
'u2-sync': {
  s: 'Do threads ek hi data ko ek saath badlein toh gadbad hoti hai. synchronized ek time pe ek hi thread ko andar aane deta hai.',
  story: 'Train mein ek seat bachi. Do log ek hi second mein "book" dabaate hain. Dono ko dikha "1 seat free", dono ko ticket mil gaya. Gadbad! Solution: booking counter pe taala, ek book kare phir doosra.',
  words: [['Race condition', 'Do threads ek saath shared data badlein toh galat result.'], ['synchronized', 'Keyword jo method pe taala lagata hai.'], ['Lock', 'Jiske paas taala, wahi andar jaayega.'], ['Priority', '1-10 number jo scheduler ko request karta hai (guarantee nahi).'], ['Deadlock', 'Do threads ek doosre ka hamesha wait karte reh jaayein.']],
  how: ['Method ko <code>synchronized</code> likho.', 'Pehla thread taala lekar andar jaata hai.', 'Baaki bahar wait karte hain (Blocked).', 'Wo nikla toh agla thread taala leta hai.'],
  exam: 'Even/odd do threads ka program, priority set karo. Explain: priority 1 (MIN) se 10 (MAX), default 5, sirf hint hai. Synchronization ke fayde (data safe) aur nuksaan (slow, deadlock).',
  yaad: 'synchronized = ek taala, ek thread.'
},
'u2-lambda': {
  s: 'Lambda ek chhota, bina naam ka function hai jo kai lines ka code ek line mein likh deta hai.',
  story: 'Pehle dost se kaam karwana ho toh formal application likhni padti thi. Ab bas WhatsApp: "sort kar de pls". Lambda wahi chhota message hai.',
  words: [['Lambda', 'Chhota function: (input) -> output.'], ['Functional interface', 'Aisa interface jisme sirf EK method bharna ho.'], ['Predicate', 'Kuch check karke true/false batata hai.'], ['Function', 'Ek cheez leta hai, doosri deta hai.'], ['Method reference', 'Aur chhota tareeka, jaise System.out::println.']],
  how: ['Ek method wala interface dhoondho (jaise Comparator).', 'Poori class ki jagah likho <code>(a, b) -> a - b</code>.', 'Java samajh jaata hai kaunsa method bhar rahe ho.', 'List sort, filter, print ek line mein.'],
  exam: 'Syntax (parameters) -> body, functional interface + @FunctionalInterface ki definition, ek custom example aur ek list sort ka example.',
  yaad: 'Lambda = lambi application ki jagah chhota message.'
},
'u2-stream': {
  s: 'Stream list ko step by step process karta hai (chhaanto, badlo, sort karo, jodo), bina loop likhe.',
  story: 'Aam ki factory belt: kharab aam nikaalo (filter), chhilka utaaro (map), size se lagao (sort), dabbe mein pack karo (collect). Godown ke aam ko koi haath nahi lagata.',
  words: [['filter', 'Sirf wahi rakho jo test pass kare.'], ['map', 'Har item ko kuch aur bana do.'], ['sorted', 'Order mein lagao.'], ['reduce', 'Sabko jod ke ek value (jaise total).'], ['collect', 'Result wapas list mein.']],
  how: ['<code>list.stream()</code> se shuru.', 'filter, map, sorted jaise steps jodo.', 'collect, reduce ya forEach se khatam karo.', 'Jab tak last step na ho, kuch nahi chalta.'],
  exam: 'Pipeline banao (source → beech ke steps → last step). filter, map, sorted, reduce explain karo. Program: 75 se upar wale students filter, sort, naam print.',
  yaad: 'Filter → Map → Sort → Reduce.'
},
'u2-jdbc': {
  s: 'JDBC Java program ko database se baat karne deta hai: connect karo, query bhejo, result padho, band karo.',
  story: 'Japan ke dukaandaar se baat karni hai par Japanese nahi aati, toh translator rakha. Receptionist (DriverManager) sahi translator (driver) bhejta hai.',
  words: [['Database', 'Tables mein rakha data (jaise MySQL).'], ['Driver', 'Java aur ek specific database ke beech ka translator.'], ['Connection', 'Program aur database ke beech khuli line.'], ['Query', 'SQL mein sawaal ya command, jaise SELECT * FROM student.'], ['PreparedStatement', 'Safe query jisme ? placeholders hote hain.']],
  how: ['Driver load karo.', 'DriverManager.getConnection() se connection kholo.', 'Statement banao (PreparedStatement better).', 'Query chalao: padhne ke liye executeQuery(), badlne ke liye executeUpdate().', 'Connection band karo.'],
  exam: 'Architecture banao (App → JDBC API → DriverManager → Driver → Database), 4 driver types, 5 steps, aur Statement vs PreparedStatement table (PreparedStatement SQL injection rokta hai).',
  yaad: 'Load → Connect → Statement → Execute → Close.'
},
'u2-io': {
  s: 'Stream data ka pipe hai. Byte stream raw data (photo, audio) ke liye, character stream text ke liye.',
  story: 'Ek pipe se band dabbe aate hain (bytes: photo, video). Doosre se peene ka paani (characters: padhne wala text, kisi bhi bhasha mein).',
  words: [['Byte stream', 'Raw 8-bit data. Class ke naam ke end mein "Stream".'], ['Character stream', 'Text characters. Naam ke end mein "Reader"/"Writer".'], ['FileReader', 'File se text padhta hai.'], ['BufferedReader', 'Fast padhta hai; readLine() poori line deta hai.'], ['Autoboxing', 'Java apne aap int ko Integer object bana deta hai.']],
  how: ['Text file padhne ke liye FileReader/BufferedReader.', 'Text likhne ke liye FileWriter.', 'Photo ya objects ke liye FileInputStream/FileOutputStream.', 'Collections objects rakhte hain, isliye int apne aap Integer ban jaata hai.'],
  exam: '2 marks: FileReader (file se characters padhta hai) aur BufferedReader (buffer ke saath, readLine() se poori line). Chhoti byte vs character table.',
  yaad: 'Reader/Writer = text. Stream = bytes.'
},
'u2-serial': {
  s: 'Serialization object ko bytes bana deta hai taaki file mein save ho aur baad mein wapas load ho.',
  story: 'Ghar shift: furniture dabbon mein pack (serialize), le jao, naye ghar mein unpack (deserialize). Jis kachre pe "mat pack karo" likha, wo peeche reh jaata hai (transient).',
  words: [['Serializable', 'Class pe label: "is object ko save kar sakte ho".'], ['writeObject()', 'Object ko file mein pack karta hai.'], ['readObject()', 'Wapas object mein unpack karta hai.'], ['transient', 'Field jo save NAHI honi chahiye (jaise password).']],
  how: ['Employee class pe <code>implements Serializable</code>.', 'Saare employees ek list mein rakho.', 'Add ya Delete pe poori list writeObject() se save karo.', 'Start ya View pe readObject() se load karo.'],
  exam: 'Pichle saal ye compulsory 10 marks tha! Employee class, load() aur save(), aur menu loop: 1 Add, 2 View, 3 Delete, 4 Exit.',
  yaad: 'writeObject = pack, readObject = unpack, transient = mat pack karo.'
},
'u3-ioc': {
  s: 'IoC matlab objects tum nahi banate, Spring bana ke tumhe de deta hai.',
  story: 'Ghar pe khud khaana banate ho. Hostel mess mein bas baith jao, khaana mil jaata hai. Control tumse mess ke paas chala gaya. Yahi "inversion" hai.',
  words: [['Spring', 'Framework (ready toolkit) Java apps banane ke liye.'], ['Container', 'Spring ka hissa jo objects banata aur sambhalta hai.'], ['Bean', 'Object jo Spring banata aur sambhalta hai.'], ['Dependency', 'Jo cheez object ko chahiye (Car ko Engine).'], ['Dependency Injection (DI)', 'Spring object ko uski zaroorat ki cheez de deta hai.']],
  how: ['Classes pe label lagao taaki Spring jaane.', 'Spring objects (beans) banata hai.', 'Spring har object ko uski zaroorat deta hai: constructor se, setter se, ya seedha field mein (@Autowired).', 'Tumhari class khud <code>new</code> nahi likhti.'],
  exam: '2 marks: IoC = object banane ka control Spring IoC container ko de dena. 10 marks: IoC + DI + 3 injection types ka code + table + fayde (loose coupling, easy testing).',
  yaad: 'IoC = hostel mess. Tum maango, Spring de.'
},
'u3-annot': {
  s: 'Annotations @ se shuru hone wale labels hain jo Spring ko batate hain ki har class kya kaam karti hai.',
  story: 'Office ID cards: "Manager", "Accountant", "Security". Sab employee hain, card batata hai role kya hai.',
  words: [['@Component', 'General label: "Spring, isko sambhalo".'], ['@Service', 'Same, business logic wali class ke liye.'], ['@Repository', 'Same, database wali class ke liye.'], ['@Autowired', '"Is type ka object la ke do."'], ['@Bean', 'Method pe lagta hai; jo object return kare, Spring sambhalta hai.']],
  how: ['Class pe @Component, @Service ya @Repository lagao.', 'Spring scan karke objects banata hai.', 'Jahan @Autowired likha, Spring sahi object laga deta hai.', 'Khud ke banaye objects ke liye @Configuration + @Bean.'],
  exam: 'Har annotation 1-2 line + chhota example. Yaad rakho: @Component class pe, @Bean method pe.',
  yaad: 'Component = employee, Service = logic, Repository = database, Autowired = la ke do.'
},
'u3-jpa': {
  s: 'JPA/Hibernate Java classes ko apne aap database tables bana deta hai. Relationships batate hain tables kaise jude.',
  story: 'College register: ek list students ki, ek departments ki. Har student ke aage department number. Wahi number dono lists jodta hai.',
  words: [['Table', 'Database mein rows aur columns.'], ['@Entity', '"Ye class ek table hai."'], ['@Id', 'Primary key (har row ki unique ID).'], ['Foreign key', 'Column jo doosri table ki row ki taraf ishaara kare.'], ['Join table', 'Extra table jo many-to-many mein do tables jodti hai.']],
  how: ['Class pe @Entity aur @Table.', 'ID field pe @Id aur @GeneratedValue.', 'Relationship labels: @OneToOne, @OneToMany/@ManyToOne, @ManyToMany.', 'Hibernate tables aur SQL khud bana deta hai.'],
  exam: '2 marks: @Entity (class = table) aur @Table (table ka naam). 10 marks: chaaron relationships ka code, aur tables ka diagram foreign keys ke saath.',
  yaad: 'Class = table, object = row. Foreign key "many" wali side.'
},
'u3-rest': {
  s: 'REST API se programs server se data maangte ya badalte hain, web address aur action word (GET, POST, PUT, DELETE) se.',
  story: 'Food app: "menu dikhao" (GET), "order karo" (POST), "address badlo" (PUT), "order cancel" (DELETE). Restaurant bolta hai "ho gaya" ya "nahi mila".',
  words: [['URL', 'Cheez ka web address, jaise /students/1.'], ['GET/POST/PUT/DELETE', 'Padho / banao / badlo / hatao.'], ['JSON', 'Data ka simple text format: {"name": "Asha"}.'], ['Status code', 'Reply ka number: 200 OK, 201 Created, 404 Not Found.'], ['@RestController', 'Class jiske methods web requests ka JSON mein jawab dete hain.']],
  how: ['@RestController wali class banao.', '@GetMapping, @PostMapping, @PutMapping, @DeleteMapping wale methods.', 'URL se id @PathVariable se lo.', 'Bheja gaya JSON @RequestBody se lo.', 'Data return karo, Spring JSON bana deta hai.'],
  exam: 'Poora StudentController 5 methods ke saath + table: method → URL → annotation → status code.',
  yaad: 'GET padho, POST banao, PUT badlo, DELETE hatao.'
},
'u3-patterns': {
  s: 'Design patterns common problems ke tested solutions hain. Singleton = sirf ek object; Factory = jo tumhare liye objects banaye.',
  story: 'Singleton: school ka ek hi principal. Factory: pizza counter pe "veg pizza" bolo, kitchen banati hai, tum kitchen mein nahi jaate.',
  words: [['Singleton', 'Class jo sirf ek object banne de.'], ['Factory', 'Method jo maangne ke hisaab se sahi object banaye.'], ['Observer', 'Kuch badla toh subscribers ko apne aap khabar.'], ['Strategy', 'Kaam karne ka tareeka runtime pe badlo.'], ['Creational vs Behavioral', 'Objects banane wale vs objects ki baatcheet wale patterns.']],
  how: ['Singleton: private constructor, ek static object, getInstance() wahi deta hai.', 'Factory: getShape("circle") naya Circle deta hai.', 'Observer: subscribers ki list; badlav pe sabko notify.', 'Strategy: runtime pe algorithm object chuno.'],
  exam: 'Singleton aur Factory ka code, chhota diagram, aur Creational vs Behavioral table.',
  yaad: 'Singleton = ek principal. Factory = pizza kitchen.'
},
'u3-servlet': {
  s: 'Servlet web server pe chalne wala Java program hai jo browser se form leta hai aur web page wapas bhejta hai.',
  story: 'Post office counter: bhara hua form do (request), receipt lo (response). Counter subah ek baar khulta hai, din bhar log aate hain, raat ko ek baar band.',
  words: [['Web server (Tomcat)', 'Program jo servlets chalata aur browser se baat karta hai.'], ['Request', 'Browser kya bhejta hai (form data).'], ['Response', 'Server kya wapas bhejta hai (HTML page).'], ['getParameter()', 'Form ki ek field padhta hai, jaise naam.'], ['init / service / destroy', 'Ek baar shuru / har request / ek baar band.']],
  how: ['Server servlet load karke init() ek baar chalata hai.', 'Har request pe service() (doGet ya doPost).', 'request.getParameter() se input padho.', 'response.getWriter() se jawab likho.', 'Server band hote waqt destroy() ek baar.'],
  exam: '2 marks: HttpServletRequest form input padhta hai (getParameter). 5 marks: lifecycle + WelcomeServlet HTML form ke saath.',
  yaad: 'init ek baar, service har baar, destroy ek baar.'
},
'u3-layered': {
  s: 'Spring app layers mein bata hota hai: Controller request leta hai, Service sochta hai, Repository database se baat karta hai.',
  story: 'Restaurant: waiter order leta hai, chef banata hai, storekeeper store room se saamaan laata hai. Har koi ek hi kaam karta hai.',
  words: [['Controller', 'Web request leta aur jawab bhejta hai (@RestController).'], ['Service', 'Business logic (@Service).'], ['Repository / DAO', 'Database padhta/likhta hai (@Repository).'], ['Hibernate', 'Java objects ko SQL mein aur wapas badalta hai.'], ['application.properties', 'Settings file: database address aur password.']],
  how: ['Request Controller pe aati hai.', 'Controller Service ko bulata hai.', 'Service Repository ko bulata hai.', 'Repository Hibernate se database pe SQL chalata hai.', 'Jawab JSON ban ke wapas upar jaata hai.'],
  exam: 'Layer diagram (Client → Controller → Service → Repository → Hibernate → DB) + har layer ka chhota code + application.properties.',
  yaad: 'Waiter → Chef → Storekeeper → Store room.'
},
'u3-jsp': {
  s: 'JSP ek HTML page hai jisme chhote Java tukde hote hain. Servlet aur JDBC ke saath form ka data database mein save kar sakte ho.',
  story: 'Printed form jisme khaali jagah bharni hai. Teacher attendance bharti hai; office (servlet) register (database) mein likhta hai aur "saved" ki parchi deta hai.',
  words: [['JSP', 'Java Server Page: HTML + chhote Java tukde.'], ['Directive <%@ %>', 'Page settings, imports, includes.'], ['Scriptlet <% %>', 'Java code ka block.'], ['Expression <%= %>', 'Page pe value print karta hai.'], ['EL ${ }', 'Bina Java likhe page pe data dikhata hai.']],
  how: ['attendance.jsp form dikhata hai.', 'Form AttendanceServlet ko jaata hai.', 'Servlet getParameter() se fields padhta hai.', 'JDBC INSERT se save karta hai.', 'success.jsp pe bhej deta hai jo message dikhata hai.'],
  exam: 'Q11: flow diagram, attendance.jsp, AttendanceServlet aur SQL table. Q12: har JSP component ka syntax aur include/EL se reusability.',
  yaad: 'JSP dikhata, Servlet karta, JDBC save karta.'
},
'u3-bank': {
  s: 'Paise transfer mein 2 kaam hain (A se lo, B ko do). @Transactional ensure karta hai ki ya dono hon ya ek bhi nahi.',
  story: 'UPI se ₹500 bheje. Tumhare account se kat gaye, phir server crash, dost ko mile nahi. Paise kahan gaye? Transaction ye rokta hai: kuch fail hua toh sab undo.',
  words: [['Transaction', 'Steps ka group jo saath mein pass ya saath mein fail ho.'], ['Commit', 'Saare changes pakke save karo.'], ['Rollback', 'Saare changes undo karo.'], ['@Transactional', 'Spring label jo method ko transaction mein lapet deta hai.'], ['@ControllerAdvice', 'Ek jagah jo saare controllers ke errors pakad ke saaf message bhejti hai.']],
  how: ['transfer() pe @Transactional lagao.', 'Spring transaction shuru karta hai.', 'A se paise lo, B mein daalo.', 'Sab theek → commit. Exception → rollback, kuch nahi badla.', 'Balance kam? InsufficientFundsException phenko; @ControllerAdvice saaf JSON error deta hai.'],
  exam: 'ACID explain karo, layered code (Entity, Repository, Service with @Transactional, Controller, ControllerAdvice), aur flow: success → commit, failure → rollback.',
  yaad: 'Dono steps ya kuch nahi. Fail = rollback.'
}
};
