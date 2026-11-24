// Beginner-first explainer (Gaali / tapori Hinglish, friendly gaaliyan only). Same shape as easy_en.js.
export default {
'u0-basics': {
  s: 'Abe sun, Java program = instructions, jo "class" (design) aur "object" (asli cheez) mein bate hote hain. Bas.',
  story: 'Cookie cutter dekha hai na gadhe? Cutter = design. Usse jo cookies nikalti hain = asli cookies. Ek cutter, bahut cookies.',
  words: [['Class', 'Design / saancha, cookie cutter jaisa.'], ['Object', 'Us design se bani asli cheez, ek cookie.'], ['Variable', 'Label wala dabba jisme value rakhta hai.'], ['Method', 'Object ka kaam, jaise bake().'], ['main()', 'Gate. Java yahin se ghusta hai.']],
  how: ['Pehle class likh, design.', '<code>new</code> likh ke object bana.', 'Object ko values de.', 'Method call kar, kaam karwa.'],
  exam: 'Exam question nahi hai saale, foundation hai. Class, object, variable, method ratt le.',
  yaad: 'Class = cutter, Object = cookie, Method = kaam. Itna toh yaad rakh.'
},
'u1-jvm': {
  s: 'Java ek baar likh, kahin bhi chala. Har computer pe JVM baitha hai, Java ka player.',
  story: 'Gaana MP3 mein hai, phone, laptop, car, sab pe bajta hai kyunki sabke paas player hai. Gaana same, player alag. Simple hai chutiye.',
  words: [['Compiler (javac)', 'Translator, tera code bytecode banata hai.'], ['Bytecode', 'Java ki MP3: .class file, har JVM samajhta hai.'], ['JVM', 'Player jo bytecode chalata hai.'], ['JRE', 'JVM + libraries. Sirf chalane ke liye.'], ['JDK', 'JRE + compiler. Likhne ke liye.']],
  how: ['Tu Hello.java likhta hai.', 'Compiler usko Hello.class (bytecode) banata hai.', 'Kisi bhi computer ka JVM usko padhta hai.', 'JVM us computer ki bhasha mein badal ke chala deta hai.'],
  exam: 'Likh: bytecode platform-independent, javac banata hai, JVM machine code banata hai → WORA. Boxes bana: JDK ⊃ JRE ⊃ JVM. JVM parts: Class Loader, Memory, Execution Engine. Itna nahi likha toh marks gaye.',
  yaad: 'Bytecode = MP3, JVM = player. Ratt le kamine.'
},
'u1-oop': {
  s: 'OOP ke 4 idea: data chhupa, detail chhupa, code dobara use kar, aur ek naam se alag kaam.',
  story: 'TV remote: circuit andar band (data chhupa). Tu power dabata hai, electronics tera baap bhi nahi jaanta (detail chhupi). Smart remote bhi remote hai, extra buttons ke saath (reuse). OK button har screen pe alag kaam karta hai (ek naam, kai kaam).',
  words: [['Encapsulation', 'Data private, sirf safe methods se use.'], ['Abstraction', 'KYA dikhao, KAISE chhupao.'], ['Inheritance', 'Nayi class purani ki cheezein le leti hai (extends).'], ['Polymorphism', 'Same method naam, alag kaam.'], ['private', 'Lock. Sirf apni class chhoo sakti hai.']],
  how: ['Variables private kar.', 'Abstract class bana jo sirf kaam ka naam bataye.', 'Child classes extend karein.', 'Har child apna version likhe.'],
  exam: 'Chaaron ki definition + example. 10 marks mein Employee wala: abstract Employee, private name, FullTime/PartTime extend, apna calculateSalary(). Simple hai, saale.',
  yaad: 'A PIE: Abstraction, Polymorphism, Inheritance, Encapsulation.'
},
'u1-inherit': {
  s: 'Inheritance = child class ko parent ki cheezein free mein milti hain.',
  story: 'Papa ka surname, ghar, sab tujhe mila, tune kamaya nahi, nikamme. Do papa hote toh lafda hota, isliye Java mein ek hi parent class.',
  words: [['extends', '"Ye class us class se inherit karti hai."'], ['Parent / superclass', 'Jo deta hai.'], ['Child / subclass', 'Jo leta hai.'], ['Interface', 'Promises ki list, andar code nahi.'], ['Diamond problem', 'Do parent, same method, kaunsa? Lafda.']],
  how: ['Single: ek parent, ek child.', 'Multilevel: dada → papa → beta.', 'Hierarchical: ek parent, kai bachche.', 'Do parent classes NAHI chalenge.', 'Interfaces chahe jitne implement kar.'],
  exam: 'Har type ka diagram bana. Likh: classes se multiple inheritance nahi, diamond problem ki wajah se; interfaces se hota hai.',
  yaad: 'Class ka ek baap. Interface jitne chahe.'
},
'u1-overload': {
  s: 'Overloading = same naam, alag input. Overriding = beta baap ka method apne style mein likhta hai.',
  story: 'Chai stall: "ek chai", "kam cheeni wali", "do chai", sab chai hai par input alag. Overriding: mummy ki dal, tu apne style mein banata hai. Jo kitchen mein khada, uski recipe.',
  words: [['Method', 'Naam wala kaam, jaise add().'], ['Parameters', 'Method ke inputs, brackets mein.'], ['Compile time', 'Chalne se pehle check hote waqt.'], ['Runtime', 'Jab program chal raha ho.'], ['@Override', '"Baap ka method dobara likh raha hoon."']],
  how: ['Overloading: ek class mein add(int,int) aur add(int,int,int).', 'Compiler inputs ki ginti, type, order dekh ke pehle hi chun leta hai.', 'Overriding: Animal ka sound(), Dog apna sound() likhta hai.', 'Chalte waqt asli object (Dog) ka version chalta hai.'],
  exam: 'Calculator program 3 add() ke saath. Explain: compiler number, type, order se compile time pe chunta hai. Difference table bana. Pichli baar aaya tha, gadhe.',
  yaad: 'Overloading = input alag. Overriding = recipe alag.'
},
'u1-access': {
  s: 'Access modifier batata hai kaun kis cheez ko haath laga sakta hai.',
  story: 'Teri diary (sirf tu), fridge (ghar wale), family ka sona (family + bahar gaye bachche), park bench (koi bhi).',
  words: [['private', 'Sirf same class.'], ['default', 'Kuch nahi likha. Same package (folder).'], ['protected', 'Package + child classes.'], ['public', 'Sab.'], ['Package', 'Classes ka folder.']],
  how: ['Keyword likh.', 'Java check karta hai kaun use kar raha.', 'Allowed nahi toh compile hi nahi hoga, compiler gaali dega.'],
  exam: '4×4 table bana, tick-cross bhar. Itna bhi nahi kiya toh kya ukhaadega?',
  yaad: 'Diary → Fridge → Sona → Bench.'
},
'u1-exception': {
  s: 'Exception = chalte program mein problem. Handle kiya toh chalta rahega, warna phat jaayega.',
  story: 'Scooty chala raha aur puncture. Stepney hai (catch)? Badal, aage badh. Nahi hai toh wahin khada reh chutiye (crash). Ghar pe lock hamesha lagana (finally).',
  words: [['try', 'Risky code yahan.'], ['catch', 'Gadbad hui toh kya karna.'], ['finally', 'HAMESHA chalega, safai.'], ['throw', 'Khud exception phenk.'], ['throws', 'Method pe board: "lafda ho sakta hai, tum sambhalo".']],
  how: ['Java try ka code chalata hai.', 'Error aaya toh seedha catch pe.', 'try ka baaki skip.', 'finally dono case mein chalta hai.'],
  exam: 'Hierarchy bana: Throwable → Error, Exception; Exception → checked (IOException), RuntimeException (unchecked). try/catch/finally/throw/throws + throw vs throws aur checked vs unchecked tables.',
  yaad: 'try = chala, catch = stepney, finally = lock hamesha.'
},
'u1-custom': {
  s: 'Apni exception bana, clear naam ke saath, taaki message bata de kya bakchodi hui.',
  story: '15 saal ka launda vote dene aaya. Bola "18 se kam hai be". Specific reason, vague "error" nahi.',
  words: [['Custom exception', 'Apna error type, jaise AgeException.'], ['extends Exception', 'Class ko asli exception banata hai.'], ['super(message)', 'Message baap ko de diya.'], ['getMessage()', 'Message ka text.']],
  how: ['<code>class AgeException extends Exception</code>.', 'Constructor mein <code>super(message)</code>.', '<code>throw new AgeException("Chhota hai")</code>.', 'Method pe <code>throws AgeException</code>.', 'Caller catch kare, getMessage() print.'],
  exam: '5 steps + program + output. ATM wala bhi same, InsufficientFundsException ke saath.',
  yaad: 'Bana → phenk → bata → pakad.'
},
'u2-collections': {
  s: 'Collections = bahut cheezein rakhne ke ready-made dabbe. Khud banane mein mat ghis.',
  story: 'Register (order zaroori), unique chaabiyan (duplicate nahi), bank ki line (pehle aaya pehle gaya), phone contacts (naam → number).',
  words: [['List', 'Order mein, duplicate chalega.'], ['Set', 'Duplicate ko laat.'], ['Queue', 'Pehle aaya pehle gaya.'], ['Map', 'Key → value, naam → number.'], ['java.util', 'Package jahan sab rehte hain.']],
  how: ['Sahi dabba chun.', 'Bana, jaise <code>new ArrayList&lt;&gt;()</code>.', 'add(), remove(), get().', 'Baaki Java sambhal leta hai.'],
  exam: 'Hierarchy tree bana (Map alag rakhna, galti mat kar). ArrayList, LinkedList, HashSet, HashMap 3-4 line + example.',
  yaad: 'List = register, Set = unique, Queue = line, Map = contacts.'
},
'u2-al-ll': {
  s: 'ArrayList mein dhoondhna fast, LinkedList mein beech mein ghusana fast.',
  story: 'Cinema seats (ArrayList): seat 50 pe seedha ja, par beech mein bithana hai toh sab khiskenge, sab gaali denge. Haath pakad ke line (LinkedList): 50th banda dhoondhne ko ek-ek gin, lodu, par ghusana easy.',
  words: [['Index', 'Position number, 0 se.'], ['get(i)', 'Position i wala item.'], ['Node', 'Chain ki kadi: item + padosiyon ka address.']],
  how: ['ArrayList line mein rakhta hai, seedha jump.', 'Beech mein daala toh sab khiskte hain.', 'LinkedList chain hai.', 'Daalna easy, dhoondhna slow.'],
  exam: 'Difference table, 6-8 rows. Seedha.',
  yaad: 'ArrayList = access fast. LinkedList = insert fast.'
},
'u2-hm-tm': {
  s: 'Dono key → value. HashMap fast par bikhra, TreeMap sorted par dheela.',
  story: 'HashMap = tera bag, cheez jaldi milti hai par andar kachra. TreeMap = library shelf, A se Z, saaf-suthra.',
  words: [['Key', 'Jisse dhoondhta hai.'], ['Value', 'Key ke andar ka data.'], ['Sorted', 'Order mein, A se Z.'], ['null', 'Khaali.']],
  how: ['HashMap hash se seedha jagah.', 'Fast, order random.', 'TreeMap sorted tree.', 'Thoda slow, order pakka, null key nahi leta.'],
  exam: 'Difference table: structure, order, speed, null key, methods.',
  yaad: 'HashMap = bag. TreeMap = shelf.'
},
'u2-thread-life': {
  s: 'Thread = program ka chhota naukar. Uski zindagi ke 5 stage.',
  story: 'Naukar hire (New) → desk ka wait (Runnable) → kaam (Running) → chai break (Waiting) → retire (Terminated). Retire wala wapas nahi aata.',
  words: [['Thread', 'Kaam ka raasta. Kai threads = ek saath kai kaam.'], ['start()', 'Ready kar.'], ['run()', 'Asli kaam.'], ['sleep()', 'Thoda ruk.'], ['join()', 'Doosre ke khatam hone ka wait.']],
  how: ['New: bana.', 'Runnable: start() hua, line mein.', 'Running: CPU mila.', 'Waiting: sleep/wait/join; phir wapas line.', 'Terminated: khatam. Dobara start kiya toh exception, gadhe.'],
  exam: 'State diagram arrows ke saath bana. 2 tareeke: Thread extend ya Runnable implement (better).',
  yaad: 'New → Runnable → Running → Waiting → Terminated.'
},
'u2-sync': {
  s: 'Do threads ek hi data ek saath badlenge toh bakchodi. synchronized ek time pe ek ko andar aane deta hai.',
  story: 'Ek seat, do chutiye ek hi second mein book dabaate hain, dono ko ticket. Ab train mein lafda. Solution: counter pe taala.',
  words: [['Race condition', 'Ek saath badla toh galat result.'], ['synchronized', 'Method pe taala.'], ['Lock', 'Taala jiske paas, wahi andar.'], ['Priority', '1-10, sirf request, hukum nahi.'], ['Deadlock', 'Dono ek doosre ka wait karte reh gaye.']],
  how: ['Method <code>synchronized</code> kar.', 'Pehla taala leke andar.', 'Baaki bahar Blocked.', 'Nikla toh agla andar.'],
  exam: 'Even/odd threads program + priority. Priority 1-10, default 5, sirf hint. Fayde (data safe) aur nuksaan (slow, deadlock).',
  yaad: 'synchronized = ek taala, ek banda.'
},
'u2-lambda': {
  s: 'Lambda = bina naam ka chhota function. 6 line ki bakchodi 1 line mein.',
  story: 'Pehle formal application likhni padti thi. Ab WhatsApp: "sort kar de be". Wahi lambda hai.',
  words: [['Lambda', '(input) -> output.'], ['Functional interface', 'Sirf EK method wala interface.'], ['Predicate', 'True/false batata hai.'], ['Function', 'Ek leta, doosra deta.'], ['Method reference', 'Aur chhota: System.out::println.']],
  how: ['Ek method wala interface le (Comparator).', 'Poori class ki jagah <code>(a, b) -> a - b</code>.', 'Java samajh jaata hai.', 'Sort, filter, print ek line mein.'],
  exam: 'Syntax, functional interface + @FunctionalInterface, custom example, sort example.',
  yaad: 'Lambda = WhatsApp, application nahi.'
},
'u2-stream': {
  s: 'Stream list ko step by step process karta hai, loop likhne ki zaroorat nahi, aalsi.',
  story: 'Aam ki belt: kharab nikaal (filter), chhilka utaar (map), size se laga (sort), pack kar (collect). Godown ke aam ko haath nahi.',
  words: [['filter', 'Sirf pass wale rakh.'], ['map', 'Har item badal.'], ['sorted', 'Order mein laga.'], ['reduce', 'Sab jod ke ek value.'], ['collect', 'Wapas list mein.']],
  how: ['<code>list.stream()</code>.', 'filter, map, sorted jod.', 'collect/reduce se khatam.', 'Last step nahi lagaya toh kuch nahi chalega, tere jaise.'],
  exam: 'Pipeline diagram, operations explain, students > 75 wala program.',
  yaad: 'Filter → Map → Sort → Reduce.'
},
'u2-jdbc': {
  s: 'JDBC = Java ko database se baat karwane wala. Connect, query, result, band.',
  story: 'Japanese nahi aati, translator rakh. Receptionist (DriverManager) sahi translator (driver) bhejta hai.',
  words: [['Database', 'Tables mein data (MySQL).'], ['Driver', 'Translator.'], ['Connection', 'Program aur DB ki line.'], ['Query', 'SQL sawaal: SELECT * FROM student.'], ['PreparedStatement', 'Safe query, ? ke saath.']],
  how: ['Driver load.', 'getConnection() se line khol.', 'PreparedStatement bana.', 'executeQuery() padhne ke liye, executeUpdate() badlne ke liye.', 'Band kar, bhoolna mat.'],
  exam: 'Architecture diagram, 4 drivers, 5 steps, Statement vs PreparedStatement table. Plain Statement se koi bhi chutiya SQL injection kar dega, ye likhna.',
  yaad: 'Load → Connect → Statement → Execute → Close.'
},
'u2-io': {
  s: 'Stream = data ka pipe. Byte wala photo/video ke liye, character wala text ke liye.',
  story: 'Ek pipe mein band dabbe (bytes), ek mein peene ka paani (characters, text).',
  words: [['Byte stream', 'Raw data. Naam ke end mein "Stream".'], ['Character stream', 'Text. Naam ke end mein Reader/Writer.'], ['FileReader', 'File se text padh.'], ['BufferedReader', 'Fast padh, readLine().'], ['Autoboxing', 'int apne aap Integer ban jaata hai.']],
  how: ['Text padhne ko FileReader/BufferedReader.', 'Likhne ko FileWriter.', 'Photo ke liye Stream wale.', 'List objects leti hai, isliye autoboxing.'],
  exam: '2 marks: FileReader aur BufferedReader kya karte hain. Byte vs character chhoti table.',
  yaad: 'Reader/Writer = text. Stream = bytes.'
},
'u2-serial': {
  s: 'Serialization = object ko bytes bana ke file mein daal, taaki program band hone pe gayab na ho.',
  story: 'Ghar shift: pack (serialize), le ja, unpack (deserialize). Kachra pack mat kar (transient).',
  words: [['Serializable', 'Label: "isko save kar sakte ho".'], ['writeObject()', 'Pack karke file mein.'], ['readObject()', 'Unpack.'], ['transient', 'Ye field save mat kar (password).']],
  how: ['Employee pe <code>implements Serializable</code>.', 'Sab ek list mein.', 'Add/Delete pe writeObject() se save.', 'View pe readObject() se load.'],
  exam: 'Pichle saal COMPULSORY 10 marks tha, saale! Employee class, load(), save(), menu: Add, View, Delete, Exit.',
  yaad: 'writeObject = pack, readObject = unpack, transient = kachra.'
},
'u3-ioc': {
  s: 'IoC = objects tu nahi banata, Spring bana ke deta hai.',
  story: 'Ghar pe khud khaana banata hai. Hostel mess mein baith ja, khaana mil jaayega. Control ulta ho gaya, isliye "Inversion".',
  words: [['Spring', 'Ready toolkit Java apps ke liye.'], ['Container', 'Spring ka hissa jo objects banata hai.'], ['Bean', 'Spring ka banaya object.'], ['Dependency', 'Jo object ko chahiye (Car ko Engine).'], ['DI', 'Spring zaroorat ki cheez de deta hai.']],
  how: ['Classes pe label laga.', 'Spring objects banata hai.', 'Constructor/setter/field (@Autowired) se zaroorat deta hai.', 'Tu <code>new</code> nahi likhta.'],
  exam: '2 marks: object banane ka control Spring IoC container ko. 10 marks: IoC + DI + 3 types code + table + fayde.',
  yaad: 'IoC = hostel mess. Tu maang, Spring de.'
},
'u3-annot': {
  s: 'Annotations = @ wale stickers jo Spring ko batate hain kaunsi class kya karti hai.',
  story: 'Office ID cards: Manager, Accountant, Security. Sab naukar, card pe role.',
  words: [['@Component', '"Spring, isko sambhal."'], ['@Service', 'Logic wali class.'], ['@Repository', 'Database wali class.'], ['@Autowired', '"La ke de."'], ['@Bean', 'Method pe; jo return kare Spring sambhale.']],
  how: ['Class pe sticker laga.', 'Spring scan karke banata hai.', '@Autowired pe sahi object laga deta hai.', 'Khud ke objects ke liye @Configuration + @Bean.'],
  exam: 'Har annotation 1-2 line + example. @Component class pe, @Bean method pe. Ulta mat likh dena gadhe.',
  yaad: 'Component = naukar, Service = logic, Repository = DB, Autowired = la ke de.'
},
'u3-jpa': {
  s: 'JPA/Hibernate Java class ko table bana deta hai. Relationships batate hain tables kaise jude.',
  story: 'College register: students ki list, departments ki list. Har student ke aage department number, wahi jodta hai, ullu ke patthe.',
  words: [['Table', 'Rows aur columns.'], ['@Entity', '"Ye class table hai."'], ['@Id', 'Primary key, unique ID.'], ['Foreign key', 'Doosri table ki row ka ishaara.'], ['Join table', 'Many-to-many ke liye beech ki table.']],
  how: ['Class pe @Entity, @Table.', 'ID pe @Id, @GeneratedValue.', 'Relationship labels laga.', 'Hibernate tables aur SQL khud bana deta hai.'],
  exam: '2 marks: @Entity aur @Table ka kaam. 10 marks: chaaron relationships ka code + tables diagram.',
  yaad: 'Class = table, object = row. FK "many" side.'
},
'u3-rest': {
  s: 'REST API = URL aur GET/POST/PUT/DELETE se data maangna-badalna.',
  story: 'Food app: menu dikha (GET), order kar (POST), address badal (PUT), cancel (DELETE). Server bolta hai "ho gaya" ya "nahi mila be".',
  words: [['URL', 'Address, jaise /students/1.'], ['GET/POST/PUT/DELETE', 'Padh / bana / badal / uda.'], ['JSON', 'Data ka text format.'], ['Status code', '200 OK, 201 Created, 404 Not Found.'], ['@RestController', 'Web requests ka JSON jawab dene wali class.']],
  how: ['@RestController class bana.', 'Mapping wale methods likh.', '@PathVariable se id.', '@RequestBody se JSON.', 'Return kar, Spring JSON bana dega.'],
  exam: 'Poora StudentController 5 methods + table: method → URL → annotation → status.',
  yaad: 'GET padh, POST bana, PUT badal, DELETE uda.'
},
'u3-patterns': {
  s: 'Design patterns = tested nuskhe. Singleton = sirf ek object, Factory = object banane wali factory.',
  story: 'Singleton: school ka ek principal. Factory: pizza counter pe bol, kitchen banayegi, tu kitchen mein mat ghus.',
  words: [['Singleton', 'Sirf ek object.'], ['Factory', 'Maangne pe sahi object banaye.'], ['Observer', 'Badlav pe subscribers ko khabar.'], ['Strategy', 'Tareeka runtime pe badal.'], ['Creational vs Behavioral', 'Banana vs baatcheet.']],
  how: ['Singleton: private constructor, static object, getInstance().', 'Factory: getShape("circle") → Circle.', 'Observer: subscribers ko notify.', 'Strategy: algorithm runtime pe chun.'],
  exam: 'Singleton + Factory code, diagram, Creational vs Behavioral table.',
  yaad: 'Singleton = ek principal. Factory = pizza kitchen.'
},
'u3-servlet': {
  s: 'Servlet = server pe baitha Java program jo browser ka form leke page wapas bhejta hai.',
  story: 'Post office counter: form diya (request), receipt mili (response). Subah ek baar khulta, din bhar log, raat ko ek baar band.',
  words: [['Tomcat', 'Server jo servlets chalata hai.'], ['Request', 'Browser ne kya bheja.'], ['Response', 'Server ne kya bheja.'], ['getParameter()', 'Form ki field padh.'], ['init/service/destroy', 'Ek baar / har baar / ek baar.']],
  how: ['init() ek baar.', 'Har request pe service() (doGet/doPost).', 'getParameter() se input.', 'getWriter() se jawab.', 'destroy() band hote waqt.'],
  exam: '2 marks: HttpServletRequest form input padhta hai. 5 marks: lifecycle + WelcomeServlet. Dono pichli baar aaye the, saale.',
  yaad: 'init ek baar, service har baar, destroy ek baar.'
},
'u3-layered': {
  s: 'Spring app ki layers: Controller request leta, Service sochta, Repository DB se baat karta.',
  story: 'Restaurant: waiter order, chef khaana, storekeeper saamaan. Waiter khud khaana banane lage toh restaurant band, chutiye.',
  words: [['Controller', 'Request leta, jawab deta.'], ['Service', 'Dimaag, business logic.'], ['Repository', 'Database ka kaam.'], ['Hibernate', 'Object ↔ SQL translator.'], ['application.properties', 'DB address aur password ki settings.']],
  how: ['Request Controller pe.', 'Controller → Service.', 'Service → Repository.', 'Repository → Hibernate → DB.', 'Jawab JSON ban ke wapas.'],
  exam: 'Layer diagram + har layer ka code + application.properties.',
  yaad: 'Waiter → Chef → Storekeeper → Godown.'
},
'u3-jsp': {
  s: 'JSP = HTML mein thoda Java. Servlet + JDBC se form ka data DB mein.',
  story: 'Printed form mein khaali jagah. Teacher attendance bharti, office (servlet) register (DB) mein likhta, "saved" parchi wapas.',
  words: [['JSP', 'HTML + chhota Java.'], ['Directive <%@ %>', 'Settings, imports.'], ['Scriptlet <% %>', 'Java code.'], ['Expression <%= %>', 'Value print.'], ['EL ${ }', 'Bina Java data dikhao.']],
  how: ['attendance.jsp form.', 'AttendanceServlet ko jaata.', 'getParameter() se padh.', 'JDBC INSERT se save.', 'success.jsp pe message.'],
  exam: 'Q11 COMPULSORY tha! Flow diagram, attendance.jsp, servlet, SQL table. Q12: components ka syntax + reusability. Chhod mat dena kamine.',
  yaad: 'JSP dikhata, Servlet karta, JDBC save karta.'
},
'u3-bank': {
  s: 'Transfer = 2 kaam (kaato + daalo). @Transactional: ya dono, ya kuch nahi.',
  story: 'UPI se ₹500 bheje, tere kat gaye, server crash, dost ko nahi mile. Paise gaye kahan be?! Transaction bolta hai: fail hua toh sab undo.',
  words: [['Transaction', 'Steps jo saath pass ya saath fail.'], ['Commit', 'Pakka save.'], ['Rollback', 'Sab undo.'], ['@Transactional', 'Method ko transaction mein lapet.'], ['@ControllerAdvice', 'Saare errors ek jagah pakad ke saaf message.']],
  how: ['transfer() pe @Transactional.', 'Spring transaction shuru.', 'A se lo, B ko do.', 'Theek → commit. Exception → rollback.', 'Balance kam → InsufficientFundsException → @ControllerAdvice JSON error.'],
  exam: 'ACID, layered code, flow: success → commit, failure → rollback.',
  yaad: 'Dono ya kuch nahi. Lafda = rollback.'
}
};
