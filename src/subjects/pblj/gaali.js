// "Gaali mode": tapori Hindi with (non-misogynistic) gaaliyan. Same 5-part shape as bhai.js.
export default {
'u0-basics': {
  s: 'Abe saale, Java mein sab kuch class aur object hai. Itna bhi nahi pata toh padh le pehle.',
  ex: `<p>Builder ke paas <b>naksha</b> hota hai na, chutiye? Naksha pe tu reh nahi sakta, wo kagaz hai. Usi naksha se builder <b>asli ghar</b> banata hai, ek se 10 ghar bhi bana sakta hai.</p>`,
  java: `<ul><li><b>Class</b> = naksha, gadhe. <code>class Student { String name; }</code></li><li><b>Object</b> = asli ghar. <code>new Student()</code> likha, ban gaya. Bina new ke kuch nahi banta, yaad rakh.</li><li><b>Method</b> = kaam jo object karta hai, jaise <code>study()</code>. Tu toh karta nahi, object karta hai.</li><li><b>main()</b> = program ka gate, Java yahin se ghusta hai.</li></ul>`,
  exam: `<p>Exam question nahi hai lodu, foundation hai. Bas ye words yaad rakh: <b>class, object, method, constructor, main()</b>.</p>`,
  yaad: 'Class = naksha, Object = ghar, Method = kaam. Ab aage badh kamine.'
},
'u1-jvm': {
  s: 'Ek baar compile kar, kahin bhi chala. Kyunki har jagah JVM baitha hai, saala video player ki tarah.',
  ex: `<p>MP4 video bana li tune. Laptop pe chalti hai, phone pe chalti hai, Mac pe bhi chalti hai. Kyun be? Kyunki har device pe <b>player</b> hai. Video ek, player alag-alag.</p>`,
  java: `<ul><li><code>Hello.java</code> tu likhta hai.</li><li><code>javac</code> usko <b>bytecode</b> bana deta hai (<code>.class</code> file). Yahi hai MP4, samjha gadhe?</li><li><b>JVM</b> = player. Har OS ka alag, par sab same bytecode chalate hain.</li><li><b>JRE</b> = JVM + libraries, sirf chalane ke liye. <b>JDK</b> = JRE + javac jaise tools, banane ke liye.</li></ul>`,
  exam: `<p>Likh: <b>Bytecode</b> is platform-independent code in .class files made by javac. <b>JVM</b> converts it to machine code → <b>WORA</b>. Diagram bana: <b>JDK ⊃ JRE ⊃ JVM</b>. JVM ke parts: Class Loader, Memory areas, Execution Engine. Itna nahi likha toh tere marks gaye.</p>`,
  yaad: 'Bytecode = MP4, JVM = player. JDK ke andar JRE, JRE ke andar JVM. Ratt le saale.'
},
'u1-oop': {
  s: 'OOP ke 4 pillar hain. Data chhupa, detail chhupa, baap se le, aur ek naam ke kai roop. Bas.',
  ex: `<p>Car dekh chutiye:</p><ol><li>Engine bonnet mein band hai, tu haath nahi lagata.</li><li>Tu chaabi ghumata hai, andar kya hota hai tera baap bhi nahi jaanta.</li><li>SportsCar bhi car hai, saari cheezein free mein.</li><li>Horn car mein "peep", truck mein "paaaam". Naam same, aawaz alag.</li></ol>`,
  java: `<ul><li><b>Encapsulation</b> = <code>private</code> variable, bahar se sirf getter/setter. Seedha haath lagaya toh error, gadhe.</li><li><b>Abstraction</b> = <code>abstract class</code> / <code>interface</code>: kya karna hai bata, kaise karna hai baccha class dekhegi.</li><li><b>Inheritance</b> = <code>extends</code>. Baap ki property free.</li><li><b>Polymorphism</b> = overloading (alag inputs) + overriding (beta ne naye tareeke se likha).</li></ul>`,
  exam: `<p>Har pillar ki definition + keyword + chhota example. 10 marks mein Employee wala example chhaap: abstract Employee, private name, FullTime/PartTime extends, calculateSalary() override. Simple hai kamine.</p>`,
  yaad: 'A PIE: Abstraction, Polymorphism, Inheritance, Encapsulation. Pie kha aur yaad rakh.'
},
'u1-inherit': {
  s: 'Beta baap ki property leta hai. Java mein ek class ka ek hi baap, do baap ka lafda allowed nahi.',
  ex: `<p>Papa ka ghar, gaadi, surname, sab tujhe milta hai, nikamme. Ab soch ek bachche ke <b>do baap</b>, dono ki alag gaadi. Bachcha bole "papa ki gaadi", kaunse papa ki be? Pura confusion. Java ye chutiyapa nahi chahta.</p>`,
  java: `<ul><li><code>class Dog extends Animal</code>: Dog ko Animal ka <code>eat()</code> free.</li><li>Types: <b>Single</b>, <b>Multilevel</b> (dada→papa→beta), <b>Hierarchical</b> (ek baap, kai bachche).</li><li><b>Multiple</b> classes se nahi hota, isko <b>Diamond Problem</b> bolte hain.</li><li>Jugaad: <b>interface</b>. <code>class C implements A, B</code>. Interface sirf bolta hai kya chahiye, likhna class ko padta hai. Koi lafda nahi.</li></ul>`,
  exam: `<p>Types ke chhote diagrams bana. Likh: multiple inheritance with classes is not supported due to the <b>diamond problem</b>; achieved through <b>interfaces</b>.</p>`,
  yaad: 'Class ka ek baap. Interface jitne chahe. Do baap = lafda.'
},
'u1-overload': {
  s: 'Overloading = same naam, alag inputs, compiler pehle hi decide kar leta hai. Overriding = beta baap ka method apne style mein likhta hai, chalte waqt decide hota hai.',
  ex: `<p><b>Overloading:</b> Chai wala, saale. "1 chai", "kam cheeni wali chai", "2 chai": naam ek, jo bola wahi milega.</p><p><b>Overriding:</b> Papa ki dal ki recipe, beta apne tareeke se banata hai. Kitchen mein jo khada hai, uski recipe chalegi.</p>`,
  java: `<ul><li>Overloading: <code>add(int,int)</code>, <code>add(int,int,int)</code> same class mein. Compiler arguments ki <b>ginti, type, order</b> dekhta hai. Sirf return type badla toh error milega gadhe.</li><li>Overriding: <code>Animal a = new Dog(); a.sound();</code> → Dog wala chalega. Asli object dekha jaata hai, runtime pe.</li></ul>`,
  exam: `<p>Calculator add wala program chhaap. Likh: compiler picks overloaded method by <b>number, type, order of parameters</b> at <b>compile time</b>. Difference table bana, 6-8 rows. Pichli baar yahi aaya tha, chutiye.</p>`,
  yaad: 'Overloading = order badlo. Overriding = recipe badlo.'
},
'u1-access': {
  s: 'Access modifier batata hai kaun kis cheez ko haath laga sakta hai. Bas itni si baat hai.',
  ex: `<ul><li>Teri <b>diary</b>: sirf tu padhega.</li><li><b>Fridge</b>: ghar ke sab log.</li><li><b>Family ka gold</b>: ghar wale + shaadi karke gaye bachche.</li><li><b>Bahar ka bench</b>: koi bhi aaye, baithe.</li></ul>`,
  java: `<ul><li><code>private</code> = diary → sirf same class. Bahar se haath lagaya toh compiler gaali dega.</li><li>default = fridge → same package.</li><li><code>protected</code> = gold → package + child classes.</li><li><code>public</code> = bench → sab.</li></ul>`,
  exam: `<p>4×4 table bana, tick-cross bhar. Itna bhi nahi bana toh kya ukhaadega exam mein?</p>`,
  yaad: 'Diary → Fridge → Gold → Bench.'
},
'u1-exception': {
  s: 'Exception = chalte program mein gadbad. Handle kiya toh program chalta rahega, warna phat jaayega.',
  ex: `<p>Scooty chala raha hai aur <b>puncture</b>. Stepney hai (catch)? Badal, aage badh. Nahi hai toh wahin khada reh, chutiye (crash). Aur ghar pahunch ke <b>lock</b> lagana hai hamesha, puncture ho ya na ho (finally).</p>`,
  java: `<ul><li><code>try</code> = risky kaam yahan.</li><li><code>catch</code> = gadbad pakdo, program crash nahi hoga.</li><li><code>finally</code> = hamesha chalega, file band kar yahan.</li><li><code>throw</code> = khud gadbad phenk. <code>throws</code> = method pe board "yahan lafda ho sakta hai, tum sambhalo".</li><li><b>Checked</b> = compiler pehle hi chillaata hai (IOException). <b>Unchecked</b> = chalte waqt aati hai (NullPointerException). <b>Error</b> = system ki fati padi hai, handle nahi hoti.</li></ul>`,
  exam: `<p>Hierarchy diagram bana: Throwable → Error, Exception → Checked, RuntimeException. Fir throw vs throws aur checked vs unchecked ki tables. Itna likha toh pass, warna tu gaya.</p>`,
  yaad: 'try = chala, catch = stepney, finally = lock hamesha.'
},
'u1-custom': {
  s: 'Apni exception class bana taaki naam hi bata de kya bakchodi hui.',
  ex: `<p>15 saal ka launda vote dene aaya. Officer bolta hai "<b>age kam hai be</b>". Ye specific reason hai, generic "error" nahi. ATM bhi bolta hai "<b>Insufficient balance</b>", kyunki tere account mein kuch hai hi nahi.</p>`,
  java: `<ol><li><code>class AgeException extends Exception</code></li><li><code>AgeException(String m) { super(m); }</code>, message baap ko de diya.</li><li><code>if (age &lt; 18) throw new AgeException("Chhota hai");</code></li><li>Method pe <code>throws AgeException</code></li><li><code>catch (AgeException e)</code> mein <code>e.getMessage()</code> print kar.</li></ol>`,
  exam: `<p>5 steps + program + output chhaap. ATM wale mein bhi same, bas InsufficientFundsException. Copy paste jaisa hai, gadhe.</p>`,
  yaad: 'extends Exception → throw → throws → catch. Khatam.'
},
'u2-collections': {
  s: 'Collections = data rakhne ke ready-made dabbe. Khud array ke saath ghisne ki zaroorat nahi.',
  ex: `<ul><li><b>Attendance register</b>: order mein naam, duplicate bhi chalega → List.</li><li><b>Roll numbers</b>: koi duplicate nahi → Set.</li><li><b>Canteen ki line</b>: pehle aaya pehle gaya → Queue.</li><li><b>Phone contacts</b>: naam → number → Map.</li></ul>`,
  java: `<ul><li><b>ArrayList</b>: badhne wala array, index se fast.</li><li><b>LinkedList</b>: chain, add/remove fast.</li><li><b>HashSet</b>: duplicate ko laat maar ke bahar.</li><li><b>HashMap</b>: key → value.</li><li><b>Map</b> Collection ka hissa nahi hai, alag family. Ye galti mat karna chutiye.</li></ul>`,
  exam: `<p>Hierarchy ka tree bana, phir har class ke 3-4 lines + chhota code.</p>`,
  yaad: 'List = register, Set = unique, Queue = line, Map = contacts.'
},
'u2-al-ll': {
  s: 'ArrayList mein dhoondhna fast, LinkedList mein beech mein ghusana fast. Bas itna yaad rakh.',
  ex: `<p><b>Cinema seats</b> (ArrayList): seat 50 pe seedha ja. Par beech mein kisi ko bithana hai toh peeche sabko khiskana padega, sab gaali denge.</p><p><b>Haath pakad ke line</b> (LinkedList): 50th banda dhoondhna hai toh ek-ek gin, lodu. Par ghusana easy: do haath chhodo, pakdo.</p>`,
  java: `<ul><li>ArrayList = array → <code>get(i)</code> fast, beech mein add slow.</li><li>LinkedList = nodes (data + aage-peeche ka address) → add/remove fast, <code>get(i)</code> slow, memory zyada khaata hai.</li></ul>`,
  exam: `<p>Difference table, 6-8 rows. Seedha.</p>`,
  yaad: 'ArrayList = Access fast. LinkedList = Link badlo fast.'
},
'u2-hm-tm': {
  s: 'Dono key-value. HashMap fast par bina order, TreeMap sorted par thoda dheela.',
  ex: `<p><b>HashMap</b> = tera bag. Cheez jaldi mil jaati hai par andar sab kachra bikhra hai.</p><p><b>TreeMap</b> = library ka shelf. Sab alphabetical, thoda time lagta hai, par saaf-suthra.</p>`,
  java: `<ul><li>HashMap: O(1), order random, ek <code>null</code> key chal jaati hai.</li><li>TreeMap: Red-Black tree, keys sorted, O(log n), <code>null</code> key daali toh phat jaayega (NullPointerException).</li></ul>`,
  exam: `<p>Difference table bana: structure, order, speed, null key, methods.</p>`,
  yaad: 'HashMap = bag (fast, kachra). TreeMap = shelf (sorted).'
},
'u2-thread-life': {
  s: 'Thread ek chhota naukar hai. Uski zindagi ke 5 stage hain. Ratt le.',
  ex: `<ol><li>Naukar hire hua → <b>New</b></li><li>Joining hui, desk ka wait → <b>Runnable</b></li><li>Desk mila, kaam chalu → <b>Running</b></li><li>Chai break ya boss ka wait → <b>Waiting/Blocked</b></li><li>Retire → <b>Terminated</b>. Dobara join? Bhool ja.</li></ol>`,
  java: `<ul><li><code>new Thread()</code> → New, <code>start()</code> → Runnable, scheduler ne chuna → Running.</li><li><code>sleep()</code>, <code>wait()</code>, <code>join()</code> → Waiting. <code>run()</code> khatam → Terminated. Dobara <code>start()</code> kiya toh exception, gadhe.</li><li>2 tareeke: <code>extends Thread</code> ya <code>implements Runnable</code> (ye better).</li></ul>`,
  exam: `<p>State diagram arrows ke saath bana, ye pakka chahiye. Dono tareekon ka code. join() = wait, sleep() = ruk ja.</p>`,
  yaad: 'New → Runnable → Running → Waiting → Terminated.'
},
'u2-sync': {
  s: 'Do threads ek hi cheez ek saath badlenge toh bakchodi hogi. synchronized ek time pe ek hi ko andar aane deta hai.',
  ex: `<p>IRCTC pe <b>ek seat</b> bachi, do chutiye ek hi second mein book dabaate hain, dono ki booking ho gayi. Ek seat, do log, ab train mein lafda. Isko <b>race condition</b> bolte hain.</p><p>Solution: counter pe <b>taala</b>. Ek andar, kaam kar, nikal, tab doosra.</p>`,
  java: `<ul><li><code>synchronized void book()</code>: lock mila toh andar, warna <b>Blocked</b> khada reh.</li><li><b>Priority</b> 1 se 10, default 5. <code>setPriority(10)</code> bas request hai, scheduler tere baap ka naukar nahi.</li><li>Galat lock lagaya toh <b>deadlock</b>: dono ek doosre ka wait karte reh jaayenge.</li></ul>`,
  exam: `<p>Even/Odd threads ka program, priority set kar, aur likh priority is only a hint. Synchronization ke fayde (data safe) aur nuksaan (slow, deadlock).</p>`,
  yaad: 'synchronized = ek taala, ek banda. Priority = sirf request, hukum nahi.'
},
'u2-lambda': {
  s: 'Lambda = bina naam ka chhota function. 6 line ki bakchodi 1 line mein.',
  ex: `<p>Pehle dost ko bolna ho toh <b>formal application</b> likhni padti thi. Ab bas WhatsApp: "sort kar de be". Wahi lambda hai.</p>`,
  java: `<ul><li>Format: <code>(input) -> output</code>, jaise <code>(a, b) -> a - b</code>.</li><li>Sirf <b>functional interface</b> pe chalta hai: jisme sirf <b>ek</b> abstract method ho. Do hue toh lambda confuse ho jaayega.</li><li>Ready-made: Predicate (true/false), Function (badlo), Consumer (use kar), Supplier (de).</li></ul>`,
  exam: `<p>Syntax, functional interface ki definition + @FunctionalInterface, ek custom interface ka example aur sort wala lambda.</p>`,
  yaad: 'Lambda = WhatsApp. Functional interface = ek hi kaam.'
},
'u2-stream': {
  s: 'Stream se list ka data filter kar, badal, sort kar, jod. Loop likhne ki zaroorat nahi, aalsi.',
  ex: `<p>Factory ki <b>belt</b>: aam daale, kharab nikale (filter), chhilke utaare (map), size se lagaye (sorted), dabbe mein pack (collect/reduce). Godown ke aam ko haath bhi nahi laga.</p>`,
  java: `<ul><li><code>list.stream().filter(x -> x > 75).map(x -> x * 2).sorted().collect(Collectors.toList())</code></li><li><code>reduce(0, (a, b) -> a + b)</code> = sab jod.</li><li>Beech ke steps lazy hain, last step nahi lagaya toh kuch nahi chalega. Tere jaise.</li></ul>`,
  exam: `<p>Pipeline diagram (source → intermediate → terminal), har operation ki definition, aur students &gt; 75 wala program.</p>`,
  yaad: 'Filter → Map → Sorted → Reduce.'
},
'u2-jdbc': {
  s: 'JDBC = Java ko database se baat karwane wala. Connect kar, query chala, result le, band kar.',
  ex: `<p>Japanese dukaandaar se baat karni hai aur tujhe Japanese aati nahi, gadhe. <b>Translator</b> chahiye. Reception wala (DriverManager) sahi translator (driver) bhejta hai.</p>`,
  java: `<ol><li><code>Class.forName(...)</code> driver load</li><li><code>DriverManager.getConnection(url, user, pass)</code></li><li>Statement bana</li><li>SELECT → <code>executeQuery()</code>; baaki → <code>executeUpdate()</code></li><li><code>close()</code>, band karna mat bhoolna</li></ol><p><b>PreparedStatement</b> mein <code>?</code> laga. Plain Statement mein input jodega toh koi bhi chutiya <code>' OR '1'='1</code> daal ke saara data uda lega.</p>`,
  exam: `<p>Architecture diagram, 4 driver types, 5 steps, aur Statement vs PreparedStatement table.</p>`,
  yaad: 'Load → Connect → Statement → Execute → Close.'
},
'u2-io': {
  s: 'Stream = data ka pipe. Byte wala binary ke liye, character wala text ke liye.',
  ex: `<p>Ek pipe mein <b>paani</b> (text), ek mein <b>saamaan ke dabbe</b> (photo, video). Paani wala samajhta hai ye peene ka hai, dabbe wala bas dabbe dhota hai.</p>`,
  java: `<ul><li>Byte stream: 8-bit, <code>InputStream</code>/<code>OutputStream</code>.</li><li>Character stream: 16-bit, <code>Reader</code>/<code>Writer</code>.</li><li><b>FileReader</b> = file se characters. <b>BufferedReader</b> = fast, <code>readLine()</code>.</li><li><b>Autoboxing</b>: <code>int</code> apne aap <code>Integer</code> ban jaata hai. Jaadu nahi hai, Java hai.</li></ul>`,
  exam: `<p>2 marks: FileReader aur BufferedReader, kya karte hain. Byte vs Character ki chhoti table.</p>`,
  yaad: 'Naam ke end mein Reader/Writer = character. Stream = byte.'
},
'u2-serial': {
  s: 'Serialization = object ko bytes bana ke file mein daal, taaki program band hone pe sab gayab na ho.',
  ex: `<p>Ghar shift kar raha hai. Furniture <b>pack</b> kiya (serialize), truck mein daala, naye ghar mein <b>unpack</b> kiya (deserialize). Kachra pack hi nahi kiya (transient).</p>`,
  java: `<ul><li><code>implements Serializable</code>, ye marker interface hai, koi method nahi.</li><li>Save: <code>ObjectOutputStream.writeObject(list)</code></li><li>Load: <code>ObjectInputStream.readObject()</code></li><li><code>transient</code> field save nahi hoti, wapas null aati hai.</li></ul>`,
  exam: `<p><b>10 marks compulsory</b> tha pichli baar, saale! Employee class, load(), save(), menu (Add, View, Delete, Exit). Har change ke baad save. Ye chhoda toh seedha fail.</p>`,
  yaad: 'writeObject = pack, readObject = unpack, transient = kachra mat pack kar.'
},
'u3-ioc': {
  s: 'IoC matlab objects tu khud nahi banata, Spring bana ke tere muh mein daal deta hai.',
  ex: `<p>Ghar pe khud khaana banata hai, sab control tera. <b>Hostel mess</b> mein bas thaali leke baith ja, khaana mess wala dega. Control ulta ho gaya, isliye Inversion of Control.</p>`,
  java: `<ul><li>Bina IoC: <code>Engine e = new PetrolEngine();</code> Car ke andar. Engine badalna hai? Code ghis.</li><li>IoC: Spring container Engine bana ke Car ko deta hai, isko <b>Dependency Injection</b> bolte hain.</li><li>3 tareeke: <b>Constructor</b> (best), <b>Setter</b>, <b>Field</b> (<code>@Autowired</code> seedha variable pe).</li></ul>`,
  exam: `<p>2 marks: control of object creation is given to the <b>Spring IoC container</b>. 10 marks: IoC + DI + teeno types ka code + table + advantages (loose coupling).</p>`,
  yaad: 'IoC = hostel mess. Tu maang, Spring dega.'
},
'u3-annot': {
  s: 'Annotations = stickers jo Spring ko batate hain kaunsi class kya kaam karti hai.',
  ex: `<p>Office ke ID cards: "Manager", "Accountant", "Security". Card dekh ke pata chal jaata hai kaun kya karta hai. Sab naukar hain, bas kaam alag.</p>`,
  java: `<ul><li><code>@Component</code> = Spring ka naukar.</li><li><code>@Service</code> = logic wala, <code>@Repository</code> = database wala.</li><li><code>@Autowired</code> = "la ke de".</li><li><code>@Configuration</code> + <code>@Bean</code> = khud object bana ke Spring ko de.</li></ul>`,
  exam: `<p>Har annotation ki 1-2 line + example. @Component class pe, @Bean method pe. Ulta mat likh dena, gadhe.</p>`,
  yaad: 'Component = naukar, Service = logic, Repository = DB, Autowired = la ke de.'
},
'u3-jpa': {
  s: 'JPA/Hibernate Java class ko table bana deta hai. Relationships batate hain tables kaise jude hain.',
  ex: `<p>College register: Students ki list, Departments ki list. Har student ke aage department number. Wahi number dono ko jodta hai, isko <b>foreign key</b> kehte hain, ullu ke patthe.</p>`,
  java: `<ul><li><code>@Entity</code> = table. <code>@Table(name="students")</code> = naam.</li><li><code>@Id</code> = primary key. <code>@GeneratedValue</code> = id khud badhegi.</li><li>@OneToOne, @OneToMany/@ManyToOne (FK "many" wali side), @ManyToMany (beech mein join table).</li></ul>`,
  exam: `<p>2 marks: @Entity aur @Table ka purpose. 10 marks: chaaron relationships ka code + table diagram.</p>`,
  yaad: 'Class = table, object = row. FK hamesha "many" side pe.'
},
'u3-rest': {
  s: 'REST API = URL aur GET/POST/PUT/DELETE se data maangna aur bhejna. Itni si baat.',
  ex: `<p>Zomato: "menu dikha" (GET), "order kar" (POST), "address badal" (PUT), "cancel kar" (DELETE). Server bolta hai "ho gaya" (200) ya "nahi mila, chutiye" (404).</p>`,
  java: `<ul><li><code>@RestController</code> = JSON mein jawab.</li><li><code>@GetMapping</code>, <code>@PostMapping</code>, <code>@PutMapping</code>, <code>@DeleteMapping</code>.</li><li><code>@PathVariable</code> = URL se id. <code>@RequestBody</code> = JSON → object.</li><li>200 OK, 201 Created, 404 Not Found.</li></ul>`,
  exam: `<p>Poora StudentController chhaap 5 methods ke saath + table: method → URL → annotation → status.</p>`,
  yaad: 'GET dekh, POST bana, PUT badal, DELETE uda.'
},
'u3-patterns': {
  s: 'Design patterns = common problems ke tested solutions. Singleton = sirf ek object, Factory = object ki factory.',
  ex: `<p><b>Singleton:</b> college ka ek hi Principal. <b>Factory:</b> Domino's pe bol "veg pizza", kitchen banayegi, tu kitchen mein mat ghus. <b>Observer:</b> YouTube subscribe. <b>Strategy:</b> Maps mein car/bike/paidal.</p>`,
  java: `<ul><li>Singleton: <b>private constructor</b>, <b>static instance</b>, <code>getInstance()</code> hamesha wahi object.</li><li>Factory: <code>ShapeFactory.getShape("circle")</code> andar se <code>new Circle()</code>.</li><li><b>Creational</b> = object banana. <b>Behavioral</b> = objects ki baatcheet.</li></ul>`,
  exam: `<p>Singleton + Factory code, diagram, Creational vs Behavioral table.</p>`,
  yaad: 'Singleton = ek Principal. Factory = Domino\'s kitchen.'
},
'u3-servlet': {
  s: 'Servlet = server pe baitha Java program jo browser ka form leke jawab bhejta hai.',
  ex: `<p>Post office counter: form diya (request), receipt mili (response). Counter subah ek baar khulta hai, din bhar log aate hain, shaam ko ek baar band.</p>`,
  java: `<ul><li><code>init()</code> = ek baar.</li><li><code>service()</code> → <code>doGet()</code>/<code>doPost()</code> = har request pe.</li><li><code>destroy()</code> = ek baar, band hote waqt.</li><li><code>request.getParameter("studentName")</code> = form ka data. <code>response.getWriter()</code> = jawab likh.</li></ul>`,
  exam: `<p>2 marks: HttpServletRequest ka function. 5 marks: lifecycle + WelcomeServlet code. Pichli baar dono aaye the, saale.</p>`,
  yaad: 'init ek baar, service har baar, destroy ek baar.'
},
'u3-layered': {
  s: 'App ko layers mein baant: Controller request leta hai, Service dimaag lagata hai, Repository DB se baat karta hai.',
  ex: `<p>Restaurant: waiter order leta hai, chef banata hai, store keeper saamaan laata hai. Waiter khud khaana banane lage toh restaurant band, chutiye.</p>`,
  java: `<ul><li><code>@RestController</code> = waiter. <code>@Service</code> = chef. <code>@Repository</code> extends JpaRepository = store keeper.</li><li><b>Hibernate</b> = object ko SQL mein badalne wala.</li><li><b>Spring</b> sabko jodta hai aur <code>application.properties</code> se DB connect karta hai.</li></ul>`,
  exam: `<p>Layer diagram + har layer ka chhota code + application.properties.</p>`,
  yaad: 'Waiter → Chef → Store keeper → Godown.'
},
'u3-jsp': {
  s: 'JSP = HTML mein thoda Java. Servlet + JSP + JDBC se form ka data database mein save karte hain.',
  ex: `<p>Printed form jisme khaali jagah bharti hai. Teacher attendance bharti hai → office (Servlet) register (database) mein likhta hai → "saved" ki parchi wapas.</p>`,
  java: `<ul><li><code>&lt;%@ %&gt;</code> directive, <code>&lt;% %&gt;</code> scriptlet, <code>&lt;%= %&gt;</code> expression, <code>&lt;%! %&gt;</code> declaration, <code>&lt;jsp:include&gt;</code>, <code>\${msg}</code> EL.</li><li>attendance.jsp → AttendanceServlet <code>getParameter()</code> → JDBC INSERT → success.jsp.</li></ul>`,
  exam: `<p>Q11 compulsory tha! Flow diagram + attendance.jsp + AttendanceServlet + SQL table. Q12: har component ka syntax + reusability. Chhod mat dena kamine.</p>`,
  yaad: 'JSP = dikhana, Servlet = karna, JDBC = save karna.'
},
'u3-bank': {
  s: 'Transfer mein do kaam: kaato + daalo. @Transactional bolta hai ya dono hon, ya ek bhi nahi.',
  ex: `<p>Dost ko UPI se ₹500 bheje. Tere kat gaye, server down, dost ko mile nahi. Paise gaye kahan be?! Bank aisi bakchodi nahi kar sakta. Gadbad hui toh paise wapas, isko rollback bolte hain.</p>`,
  java: `<ul><li><code>@Transactional</code> service method pe.</li><li>Sab theek → <b>commit</b>. <code>RuntimeException</code> → <b>rollback</b>.</li><li>Balance kam? <code>throw new InsufficientFundsException()</code>.</li><li><code>@ControllerAdvice</code> + <code>@ExceptionHandler</code> = saare errors ek jagah pakad ke saaf JSON bhej.</li></ul>`,
  exam: `<p>ACID likh, layered code (Entity, Repository, Service @Transactional, Controller, ControllerAdvice), flow diagram (success → commit, failure → rollback).</p>`,
  yaad: 'Transfer = dono ya kuch nahi. Lafda = rollback.'
}
};
