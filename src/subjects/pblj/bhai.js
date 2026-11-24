// "Bhai lang" explainer per topic, in 5 clear parts:
// s = seedhi baat (one line), ex = desi example, java = how it maps to Java,
// exam = what to write in the exam (English keywords), yaad = one-line memory hook.
export default {
'u0-basics': {
  s: 'Java mein har cheez ek naksha (class) se banti hai, aur us naksha se asli cheezein (objects) banti hain.',
  ex: `<p>Socho ek builder ke paas <b>ghar ka naksha</b> hai. Naksha mein likha hai: 2 kamre, 1 kitchen, 1 darwaza. Naksha pe tum reh nahi sakte, wo bas kagaz hai.</p><p>Usi naksha se builder <b>10 asli ghar</b> bana deta hai. Har ghar alag family ka hai, par design same.</p>`,
  java: `<ul><li><b>Class</b> = naksha. <code>class Student { String name; }</code> matlab "har student ka ek naam hoga".</li><li><b>Object</b> = asli ghar. <code>new Student()</code> likha toh ek asli student ban gaya.</li><li><b>Method</b> = ghar mein kya kaam ho sakta hai, jaise <code>study()</code>. Method = ek naam wala kaam.</li><li><b>main()</b> = program ka main gate, Java yahin se padhna shuru karta hai.</li></ul>`,
  exam: `<p>Ye exam question nahi hai, foundation hai. Bas ye words yaad rakho: <b>class, object, method, constructor, main()</b>.</p>`,
  yaad: 'Class = naksha, Object = ghar, Method = ghar mein hone wala kaam.'
},
'u1-jvm': {
  s: 'Java code ek baar compile hota hai aur kisi bhi computer pe chal jaata hai, kyunki har computer pe JVM naam ka "player" hota hai.',
  ex: `<p>Tumne ek <b>MP4 video</b> banayi. Ye video Windows laptop pe bhi chalti hai, Android phone pe bhi, Mac pe bhi. Kyun? Kyunki har device pe ek <b>video player</b> hai jo MP4 samajhta hai.</p><p>Video ek hi hai, player har device ka alag hai.</p>`,
  java: `<ul><li>Tum <code>Hello.java</code> likhte ho (insaan ki bhasha).</li><li><code>javac</code> (Java compiler, translator) usko <b>bytecode</b> mein badalta hai, file <code>Hello.class</code>. Ye hai MP4 video.</li><li><b>JVM</b> (Java Virtual Machine) = video player. Har OS ka apna JVM hai, sab same bytecode chalate hain.</li><li><b>JRE</b> = JVM + zaroori libraries (sirf chalane ke liye).</li><li><b>JDK</b> = JRE + tools jaise javac (banane ke liye).</li></ul>`,
  exam: `<p>Likhna: <b>Bytecode</b> = platform-independent code in .class file made by javac. <b>JVM</b> converts bytecode to machine code → <b>Write Once Run Anywhere</b>. Diagram: <b>JDK ⊃ JRE ⊃ JVM</b>. JVM parts: Class Loader, Memory areas (Heap, Stack…), Execution Engine.</p>`,
  yaad: 'Bytecode = MP4 file, JVM = video player. JDK ke andar JRE, JRE ke andar JVM.'
},
'u1-oop': {
  s: 'OOP ke 4 pillars hain: data chhupao, detail chhupao, property inherit karo, ek naam ke kai roop.',
  ex: `<p>Ek <b>car</b> socho:</p><ol><li>Engine bonnet ke andar band hai, tum direct nahi chhoo sakte (data chhupa hai).</li><li>Tum bas key ghumate ho, andar kya hota hai pata nahi (detail chhupi hai).</li><li>SportsCar bhi ek Car hai, toh Car ki saari cheezein usme hain (inherit).</li><li>Horn car mein "peep", truck mein "paaaam" (ek naam, alag aawaz).</li></ol>`,
  java: `<ul><li><b>Encapsulation</b> = variables <code>private</code> rakho, bahar se sirf getter/setter methods se access do.</li><li><b>Abstraction</b> = <code>abstract class</code> ya <code>interface</code>: "kya karna hai" batao, "kaise" child class likhe.</li><li><b>Inheritance</b> = <code>class SportsCar extends Car</code>: child ko parent ki cheezein free.</li><li><b>Polymorphism</b> = same method ka alag kaam. Overloading (alag inputs) aur Overriding (child ne naye tareeke se likha).</li></ul>`,
  exam: `<p>Har pillar ki <b>definition + Java mein kaise (keyword) + chhota example</b>. 10 marks ke liye Employee example likho: abstract Employee, private name, FullTime/PartTime extends, calculateSalary() override.</p>`,
  yaad: 'A PIE: Abstraction, Polymorphism, Inheritance, Encapsulation.'
},
'u1-inherit': {
  s: 'Inheritance = ek class doosri class ki cheezein le leti hai. Java mein ek class ka ek hi "baap" class ho sakta hai.',
  ex: `<p>Tumhare papa ka ghar, gaadi, surname, sab tumhe milta hai. Ye <b>inheritance</b> hai.</p><p>Ab socho ek bachche ke <b>do papa</b> hon, aur dono ke paas alag gaadi ho. Bachcha bole "papa ki gaadi lao", kaunse papa ki? Confusion! Java ye confusion nahi chahta.</p>`,
  java: `<ul><li><code>class Dog extends Animal</code> = Dog ko Animal ka <code>eat()</code> mil gaya.</li><li>Types: <b>Single</b> (A→B), <b>Multilevel</b> (A→B→C), <b>Hierarchical</b> (A→B, A→C).</li><li><b>Multiple</b> (do baap) classes se allowed nahi, ise <b>Diamond Problem</b> kehte hain.</li><li>Jugaad: <b>interface</b>. <code>class C implements A, B</code>. Interface sirf bolta hai "ye method hona chahiye", likhta class khud hai, toh confusion nahi.</li></ul>`,
  exam: `<p>Types ke chhote diagrams banao. Likho: Java doesn't support multiple inheritance with classes due to the <b>diamond problem (ambiguity)</b>; it is achieved using <b>interfaces</b>.</p>`,
  yaad: 'Classes: ek baap. Interfaces: jitne chaho.'
},
'u1-overload': {
  s: 'Overloading = same naam, alag inputs (compiler decide karta hai). Overriding = child ne parent ka method dobara likha (run hote waqt decide hota hai).',
  ex: `<p><b>Overloading:</b> Chai wala. "1 chai" bolo toh normal chai, "1 chai, kam cheeni" bolo toh alag, "2 chai" bolo toh alag. Order ka naam ek hi ("chai"), par jo bola uske hisaab se kaam.</p><p><b>Overriding:</b> Papa ki dal ki recipe, beta apne tareeke se banata hai. Ghar mein jo cook kar raha hai (asli banda), uski recipe banegi.</p>`,
  java: `<ul><li>Overloading: <code>add(int a, int b)</code> aur <code>add(int a, int b, int c)</code>, same class mein. Compiler (code check karne wala) arguments ki <b>ginti, type, order</b> dekh ke chunta hai, program chalne se pehle.</li><li>Overriding: parent <code>Animal.sound()</code>, child <code>Dog.sound()</code> same naam same inputs. <code>Animal a = new Dog(); a.sound();</code> → Dog wala chalega, program chalte waqt decide hota hai.</li></ul>`,
  exam: `<p>Program likho (Calculator add overloads). Explain: compiler picks overloaded method by <b>number, type and order of parameters</b> at <b>compile time</b>. Difference table: same class vs parent-child, parameters different vs same, compile time vs runtime.</p>`,
  yaad: 'Overloading = Order alag. Overriding = Recipe alag.'
},
'u1-access': {
  s: 'Access modifier batata hai ki ek variable ya method ko kaun-kaun dekh sakta hai.',
  ex: `<p>Ghar ki cheezein socho:</p><ul><li>Teri <b>diary</b>: sirf tu.</li><li><b>Fridge</b>: ghar ke sab log.</li><li><b>Family ka gold</b>: ghar wale + shaadi ke baad doosre ghar gaye bachche.</li><li><b>Ghar ke bahar ka bench</b>: koi bhi.</li></ul>`,
  java: `<ul><li><code>private</code> = diary → sirf usi class ke andar.</li><li>default (kuch na likho) = fridge → sirf same <b>package</b> (same folder) ki classes.</li><li><code>protected</code> = gold → same package + child classes kahin bhi.</li><li><code>public</code> = bench → sab jagah.</li></ul>`,
  exam: `<p>4×4 <b>table</b> banao: rows = private, default, protected, public; columns = same class, same package, subclass, other package. Tick/cross bharo. Bas.</p>`,
  yaad: 'Diary → Fridge → Gold → Bench (private → default → protected → public).'
},
'u1-exception': {
  s: 'Exception = program chalte waqt koi gadbad. Handle karo toh program chalta rehta hai, warna band ho jaata hai.',
  ex: `<p>Tum scooty chala rahe ho aur <b>tyre puncture</b> ho gaya (exception). Agar <b>stepney</b> hai (catch), tyre badlo aur aage chalo. Nahi hai toh wahin ruk gaye (crash).</p><p>Aur ghar pahunch ke scooty <b>lock</b> karna, puncture hua ho ya nahi, hamesha karna hai (finally).</p>`,
  java: `<ul><li><code>try { }</code> = risky kaam yahan (scooty chalana).</li><li><code>catch (Exception e) { }</code> = gadbad hui toh yahan handle (stepney).</li><li><code>finally { }</code> = hamesha chalega (lock lagana), jaise file band karna.</li><li><code>throw</code> = khud gadbad ka signal dena. <code>throws</code> = method ke upar board: "isme gadbad ho sakti hai, call karne wala sambhale".</li><li><b>Checked</b> = compiler pehle hi bolta hai handle karo (IOException). <b>Unchecked</b> = chalte waqt aati hai (NullPointerException). <b>Error</b> = system ki badi problem, handle nahi hoti.</li></ul>`,
  exam: `<p><b>Hierarchy diagram</b> banao: Throwable → Error, Exception → Checked, RuntimeException. Fir try/catch/finally/throw/throws ek-ek line. Tables: throw vs throws, checked vs unchecked.</p>`,
  yaad: 'try = chalao, catch = stepney, finally = lock hamesha.'
},
'u1-custom': {
  s: 'Apni khud ki exception class banao taaki gadbad ka naam hi bata de kya galat hua.',
  ex: `<p>Voting booth pe 15 saal ka banda aaya. Officer bolta hai "<b>Age kam hai</b>". Ye ek specific reason hai, generic "error" nahi.</p><p>Waise hi ATM bolta hai "<b>Insufficient balance</b>", clear message.</p>`,
  java: `<ol><li>Class banao: <code>class AgeException extends Exception</code></li><li>Constructor mein message bhejo: <code>AgeException(String m) { super(m); }</code> (super = parent ko message de diya).</li><li>Rule toota toh phenko: <code>if (age &lt; 18) throw new AgeException("Too young");</code></li><li>Method pe likho: <code>throws AgeException</code></li><li>Caller pakde: <code>try { register(15); } catch (AgeException e) { print(e.getMessage()); }</code></li></ol>`,
  exam: `<p>Yahi 5 steps + chhota program + output likho. ATM wale 10 marks mein same pattern, bas <b>InsufficientFundsException</b> aur menu.</p>`,
  yaad: 'extends Exception → throw → throws → catch.'
},
'u2-collections': {
  s: 'Collections = data rakhne ke ready-made dabbe. List, Set, Queue, aur alag se Map.',
  ex: `<p>Ghar mein alag cheezon ke liye alag dabbe hote hain:</p><ul><li><b>Attendance register</b>: order mein naam, ek naam do baar bhi aa sakta hai → List.</li><li><b>Unique roll numbers</b>: koi duplicate nahi → Set.</li><li><b>Canteen ki line</b>: pehle aaya pehle gaya → Queue.</li><li><b>Phone contacts</b>: naam → number → Map.</li></ul>`,
  java: `<ul><li><b>ArrayList</b>: badhne wala array, index se fast access.</li><li><b>LinkedList</b>: chain jaisa, add/remove fast.</li><li><b>HashSet</b>: duplicate allow nahi.</li><li><b>HashMap</b>: key → value, key unique.</li><li>Sab <code>java.util</code> package mein. <b>Map</b> Collection interface ka hissa nahi, alag family hai.</li></ul>`,
  exam: `<p><b>Hierarchy tree diagram</b> (Collection → List/Set/Queue, alag Map). Fir har class ka 3-4 line explanation + chhota example code.</p>`,
  yaad: 'List = register, Set = unique, Queue = line, Map = contacts.'
},
'u2-al-ll': {
  s: 'ArrayList mein dhoondhna fast hai; LinkedList mein beech mein daalna/hatana fast hai.',
  ex: `<p><b>Cinema hall ki seats</b> (ArrayList): seat number 50 pe seedha pahunch jaate ho. Par beech mein seat 3 pe kisi ko bithana hai toh peeche sabko ek-ek seat khiskana padega.</p><p><b>Haath pakad ke line</b> (LinkedList): 50th banda dhoondhne ke liye ek-ek ginna padega. Par beech mein kisi ko ghusana easy: do log haath chhodo, naye ko pakdo.</p>`,
  java: `<ul><li>ArrayList andar se array hai → <code>get(i)</code> fast, beech mein add slow.</li><li>LinkedList andar se nodes (har node mein data + aage-peeche ka address) → add/remove fast, <code>get(i)</code> slow, memory zyada.</li></ul>`,
  exam: `<p>Seedha <b>difference table</b> (6-8 rows): structure, access speed, insert/delete speed, memory, interfaces, kab use karein.</p>`,
  yaad: 'ArrayList = Access fast. LinkedList = Link badlo fast.'
},
'u2-hm-tm': {
  s: 'Dono key-value rakhte hain. HashMap fast par bina order; TreeMap sorted par thoda slow.',
  ex: `<p><b>HashMap</b> = tumhara bag. Cheez jaldi mil jaati hai par andar sab bikhra hai.</p><p><b>TreeMap</b> = library ka shelf. Books alphabetical order mein lagi hain, dhoondhne mein thoda time, par sab sorted.</p>`,
  java: `<ul><li>HashMap: hashing se seedha jagah pe → O(1) fast, order random, ek <code>null</code> key chalti hai.</li><li>TreeMap: andar Red-Black tree (sorted tree) → keys sorted, O(log n), <code>null</code> key nahi chalti.</li></ul>`,
  exam: `<p><b>Difference table</b>: structure, order, speed, null key, methods (TreeMap ke firstKey, lastKey), kab use karein.</p>`,
  yaad: 'HashMap = bag (fast, messy). TreeMap = shelf (sorted).'
},
'u2-thread-life': {
  s: 'Thread ek chhota worker hai jo program ke andar ek kaam karta hai. Uski life ke 5 stages hote hain.',
  ex: `<p>Ek naya <b>employee</b> socho:</p><ol><li>Hire hua, joining nahi hui → <b>New</b></li><li>Joining ho gayi, desk ka wait → <b>Runnable</b></li><li>Desk mila, kaam chalu → <b>Running</b></li><li>Chai break ya manager ka wait → <b>Waiting/Blocked</b>, phir wapas line mein</li><li>Retire → <b>Terminated</b> (dobara join nahi kar sakta)</li></ol>`,
  java: `<ul><li><code>new Thread()</code> → New. <code>start()</code> → Runnable. Scheduler (CPU dene wala) ne chuna → Running, <code>run()</code> ka code chalta hai.</li><li><code>sleep()</code>, <code>wait()</code>, <code>join()</code> → Waiting. <code>run()</code> khatam → Terminated.</li><li>Banane ke 2 tareeke: <code>extends Thread</code> ya <code>implements Runnable</code> (better, kyunki class ek hi class extend kar sakti hai).</li></ul>`,
  exam: `<p><b>State diagram</b> zaroor banao arrows ke saath. Fir dono tareeke ka chhota code. join() = wait for thread to finish, sleep() = pause.</p>`,
  yaad: 'New → Runnable → Running → Waiting → Terminated.'
},
'u2-sync': {
  s: 'Jab do threads ek hi cheez ko ek saath badlein toh gadbad hoti hai. synchronized ek time pe ek hi thread ko andar aane deta hai.',
  ex: `<p>IRCTC pe <b>1 seat</b> bachi hai. Do log ek hi second mein book dabaate hain. Dono ko dikha "1 seat available", dono ki booking ho gayi. Ab ek seat, do log. Ye <b>race condition</b> hai.</p><p>Solution: booking counter pe <b>taala</b>. Ek banda andar, booking kare, taala khole, tab doosra jaaye.</p>`,
  java: `<ul><li><code>synchronized void book()</code>: har object ke paas ek lock (taala) hota hai. Ek thread andar gaya toh doosra <b>Blocked</b> hoke wait karega.</li><li><b>Priority</b>: 1 se 10, default 5. <code>setPriority(Thread.MAX_PRIORITY)</code> scheduler ko sirf <i>suggest</i> karta hai, guarantee nahi.</li></ul>`,
  exam: `<p>Even/Odd do threads ka program (ek 2,4..20, doosra 1,3..19), priority set karo. Explain: priority 1-10, MIN/NORM/MAX, scheduler pe depend. Synchronization ke advantages (data safe) aur disadvantages (slow, deadlock).</p>`,
  yaad: 'synchronized = ek taala, ek banda. Priority = sirf request.'
},
'u2-lambda': {
  s: 'Lambda ek chhota, bina naam ka function hai jo lambe code ko ek line mein likh deta hai.',
  ex: `<p>Pehle dost ko kuch bolna ho toh poori <b>formal application</b> likhni padti thi: "Respected Sir, I want to say..." Ab bas <b>WhatsApp message</b>: "sort kar de bhai".</p>`,
  java: `<ul><li>Lamba tareeka: anonymous class (5-6 lines).</li><li>Lambda: <code>(a, b) -> a - b</code>. Format: <b>(input) -> output</b>.</li><li>Lambda sirf <b>functional interface</b> pe chalta hai, matlab interface jisme sirf <b>ek</b> abstract (bina body ka) method ho. Jaise <code>Comparator</code>, <code>Runnable</code>.</li><li>Ready-made: <b>Predicate</b> (true/false), <b>Function</b> (badlo), <b>Consumer</b> (use karo), <b>Supplier</b> (do).</li></ul>`,
  exam: `<p>Syntax likho, functional interface definition + @FunctionalInterface, ek custom interface ka example, aur list sort karne ka lambda example.</p>`,
  yaad: 'Lambda = WhatsApp message. Functional interface = sirf ek kaam.'
},
'u2-stream': {
  s: 'Stream list ke data ko ek line mein filter, badalna, sort karna aur jodna sikhata hai, bina loop likhe.',
  ex: `<p>Factory ki <b>conveyor belt</b>: aam belt pe daale. Pehli machine kharab aam nikaalti hai (filter). Doosri chhilka utaarti hai (map). Teesri size se line lagati hai (sort). Last mein sab ek dabbe mein pack (collect/reduce).</p><p>Godown ke original aam waise hi rehte hain.</p>`,
  java: `<ul><li><code>list.stream()</code> = belt pe daalo.</li><li><code>.filter(x -> x > 75)</code> = sirf 75 se upar rakho.</li><li><code>.map(x -> x * 2)</code> = har ek ko badlo.</li><li><code>.sorted()</code> = order mein lagao.</li><li><code>.reduce(0, (a, b) -> a + b)</code> = sab jod ke ek number. <code>.collect(Collectors.toList())</code> = wapas list.</li><li>Beech wale steps tab tak nahi chalte jab tak last step (reduce/collect) na lage.</li></ul>`,
  exam: `<p>Pipeline diagram (source → intermediate → terminal), har operation ki definition, aur students > 75 filter-sort-map ka program.</p>`,
  yaad: 'Filter → Map → Sorted → Reduce: belt pe chhanto, badlo, lagao, pack karo.'
},
'u2-jdbc': {
  s: 'JDBC Java program ko database se baat karne deta hai: connect karo, query chalao, result lo, band karo.',
  ex: `<p>Tumhe Japan ke dukaandaar se baat karni hai par Japanese nahi aati. Tum ek <b>translator</b> rakhte ho. Reception wala (DriverManager) sahi translator (driver) tumhare paas bhejta hai.</p>`,
  java: `<ol><li>Driver load: <code>Class.forName("com.mysql.cj.jdbc.Driver")</code></li><li>Connection: <code>DriverManager.getConnection(url, user, pass)</code></li><li>Statement banao (query likhne ka dabba)</li><li>Query chalao: SELECT → <code>executeQuery()</code> → ResultSet (result ki table); INSERT/UPDATE/DELETE → <code>executeUpdate()</code></li><li><code>close()</code></li></ol><p><b>PreparedStatement</b> mein <code>?</code> lagate hain aur value baad mein set karte hain. Isse hacker SQL mein ghus nahi sakta (SQL injection), aur fast bhi hai.</p>`,
  exam: `<p>Architecture diagram (App → JDBC API → DriverManager → Driver → DB), 4 driver types, 5 steps, aur <b>Statement vs PreparedStatement table</b>.</p>`,
  yaad: 'Load → Connect → Statement → Execute → Close.'
},
'u2-io': {
  s: 'Stream = data ka pipe. Byte stream binary ke liye, character stream text ke liye.',
  ex: `<p>Ek pipe se <b>paani</b> aata hai (text) aur ek se <b>raw saamaan ke dabbe</b> (photo, video). Paani wale pipe ko pata hai ki ye pine ka paani hai (characters), dabbe wale ko bas dabbe dikhte hain (bytes).</p>`,
  java: `<ul><li><b>Byte stream</b>: 8-bit bytes, <code>InputStream</code>/<code>OutputStream</code>. Images, audio, objects.</li><li><b>Character stream</b>: 16-bit characters (har bhasha ke letters), <code>Reader</code>/<code>Writer</code>. Text files.</li><li><b>FileReader</b> = file se characters padho. <b>BufferedReader</b> = fast, <code>readLine()</code> se poori line ek saath.</li><li><b>Autoboxing</b>: <code>int</code> apne aap <code>Integer</code> (object) ban jaata hai, kyunki list sirf objects rakhti hai.</li></ul>`,
  exam: `<p>2 marks: <b>FileReader</b> (reads characters from a file) aur <b>BufferedReader</b> (buffered, readLine). Byte vs Character ki chhoti table.</p>`,
  yaad: 'Naam ke end mein Reader/Writer = character stream. Stream = byte.'
},
'u2-serial': {
  s: 'Serialization = object ko bytes bana ke file mein save karna, taaki program band hone ke baad bhi data rahe.',
  ex: `<p>Ghar shift kar rahe ho. Furniture ko <b>pack</b> karke truck mein daala (serialize). Naye ghar pahunch ke <b>unpack</b> kiya, wahi furniture wapas (deserialize).</p><p>Jo cheez nahi le jaani (purana kachra), usko pack hi nahi kiya (transient).</p>`,
  java: `<ul><li>Class pe <code>implements Serializable</code> (marker interface: koi method nahi, bas permission ka thappa).</li><li>Save: <code>new ObjectOutputStream(new FileOutputStream("emp.dat")).writeObject(list)</code></li><li>Load: <code>(List&lt;Employee&gt;) new ObjectInputStream(new FileInputStream("emp.dat")).readObject()</code></li><li><code>transient</code> field save nahi hoti, wapas <code>null</code>/0 aati hai.</li></ul>`,
  exam: `<p>Ye <b>10 marks compulsory</b> tha! Employee class (Serializable), load(), save(), aur menu: 1 Add, 2 View, 3 Delete, 4 Exit. Har change ke baad save(list).</p>`,
  yaad: 'writeObject = pack, readObject = unpack, transient = mat pack karo.'
},
'u3-ioc': {
  s: 'IoC matlab objects tum khud nahi banate, Spring bana ke tumhe deta hai.',
  ex: `<p>Ghar pe khaana khud banate ho: sabzi lao, kaato, pakao. Ye control tumhare paas hai.</p><p><b>Hostel mess</b> mein tum bas thaali leke baith jaate ho, khaana mess wala bana ke deta hai. Control tumse <b>ulta</b> (inverted) ho gaya, mess ke paas chala gaya.</p>`,
  java: `<ul><li>Bina IoC: <code>class Car { Engine e = new PetrolEngine(); }</code>. Car khud engine banata hai, engine badalna hai toh Car ka code badlo.</li><li>IoC ke saath: Spring container (mess) Engine bana ke Car ko de deta hai. Isko <b>Dependency Injection (DI)</b> kehte hain.</li><li>3 tareeke: <b>Constructor</b> (best), <b>Setter</b>, <b>Field</b> (<code>@Autowired</code> seedha variable pe).</li></ul>`,
  exam: `<p>2 marks: IoC = control of object creation given to <b>Spring IoC container</b>. 10 marks: IoC + DI + teeno types ka code + comparison table + advantages (loose coupling, easy testing).</p>`,
  yaad: 'IoC = hostel mess. Tum mango, Spring de.'
},
'u3-annot': {
  s: 'Annotations Spring ko batane wale stickers hain ki kaunsi class kya kaam karti hai.',
  ex: `<p>Office mein ID cards: "Manager", "Accountant", "Security". Card dekh ke pata chal jaata hai kaun kya karta hai. Sab employee hain, bas role alag.</p>`,
  java: `<ul><li><code>@Component</code> = "ye Spring ka employee hai" (general).</li><li><code>@Service</code> = business logic wala employee.</li><li><code>@Repository</code> = database wala employee.</li><li><code>@Autowired</code> = "mujhe is type ka object la ke do".</li><li><code>@Configuration</code> + <code>@Bean</code> = manually object bana ke Spring ko dena (doosre ki class ke liye).</li></ul>`,
  exam: `<p>Har annotation ki 1-2 line + chhota example. Difference: @Component class pe lagta hai, @Bean method pe.</p>`,
  yaad: 'Component = employee, Service = logic, Repository = DB, Autowired = la ke do.'
},
'u3-jpa': {
  s: 'JPA/Hibernate Java class ko database table bana deta hai. Relationships batate hain tables kaise jude hain.',
  ex: `<p>College register socho: ek <b>Students</b> ki list, ek <b>Departments</b> ki list. Har student ke aage likha hai uska department number. Wahi number dono lists ko jodta hai (foreign key).</p>`,
  java: `<ul><li><code>@Entity</code> = ye class ek table hai. <code>@Table(name="students")</code> = table ka naam.</li><li><code>@Id</code> = primary key (har row ki unique ID). <code>@GeneratedValue</code> = ID apne aap badhegi.</li><li><b>@OneToOne</b>: ek banda, ek passport.</li><li><b>@OneToMany / @ManyToOne</b>: ek department, kai students. Foreign key students table mein.</li><li><b>@ManyToMany</b>: kai students, kai courses. Beech mein ek teesri <b>join table</b>.</li></ul>`,
  exam: `<p>2 marks: @Entity aur @Table ka purpose. 10 marks: chaaron relationships ka ek-ek example code + table diagram.</p>`,
  yaad: 'Class = table, object = row. Foreign key hamesha "many" wali side.'
},
'u3-rest': {
  s: 'REST API ek tareeka hai jisse programs internet pe URL aur GET/POST/PUT/DELETE se data maangte aur bhejte hain.',
  ex: `<p>Zomato order socho: app (client) server ko bolta hai "<b>menu dikhao</b>" (GET), "<b>naya order banao</b>" (POST), "<b>address badlo</b>" (PUT), "<b>order cancel</b>" (DELETE). Server jawab ke saath status deta hai: "ho gaya" ya "nahi mila".</p>`,
  java: `<ul><li><code>@RestController</code> = ye class requests ka jawab JSON mein degi.</li><li><code>@GetMapping("/students")</code> = sab dikhao. <code>@PostMapping</code> = naya banao. <code>@PutMapping("/{id}")</code> = badlo. <code>@DeleteMapping("/{id}")</code> = hatao.</li><li><code>@PathVariable</code> = URL se id nikaalo (<code>/students/5</code> → 5).</li><li><code>@RequestBody</code> = request ka JSON → Java object.</li><li>Status: 200 OK, 201 Created, 404 Not Found.</li></ul>`,
  exam: `<p>Poora StudentController likho 5 methods ke saath, aur ek table: method → URL → annotation → status code.</p>`,
  yaad: 'GET dekho, POST banao, PUT badlo, DELETE hatao.'
},
'u3-patterns': {
  s: 'Design patterns common problems ke tested solutions hain. Singleton = sirf ek object, Factory = object banane ki factory.',
  ex: `<p><b>Singleton:</b> college ka ek hi Principal. Koi bhi poochhe, wahi ek banda.</p><p><b>Factory:</b> Domino's pe bolo "Veg pizza", kitchen bana ke deti hai. Tum kitchen mein nahi jaate.</p><p><b>Observer:</b> YouTube subscribe, video aaya toh sabko notification. <b>Strategy:</b> Maps mein car/bike/walk route chuno.</p>`,
  java: `<ul><li>Singleton: <b>private constructor</b> (bahar se new nahi), <b>static instance</b>, <code>getInstance()</code> hamesha wahi object de.</li><li>Factory: <code>ShapeFactory.getShape("circle")</code> andar se <code>new Circle()</code> karke deta hai.</li><li><b>Creational</b> patterns = object banane ke baare mein. <b>Behavioral</b> = objects aapas mein kaise baat karein.</li></ul>`,
  exam: `<p>Singleton + Factory ka code, diagram, aur Creational vs Behavioral ki table.</p>`,
  yaad: 'Singleton = ek Principal. Factory = Domino\'s kitchen.'
},
'u3-servlet': {
  s: 'Servlet server pe chalne wala Java program hai jo browser ka form leke jawab (web page) bhejta hai.',
  ex: `<p>Post office counter: tum <b>form bhar ke</b> dete ho (request). Clerk padhta hai aur <b>receipt</b> deta hai (response). Counter subah ek baar khulta hai, din bhar log aate hain, shaam ko ek baar band.</p>`,
  java: `<ul><li><code>init()</code> = counter khula, <b>ek baar</b>.</li><li><code>service()</code> → <code>doGet()</code>/<code>doPost()</code> = <b>har request</b> pe.</li><li><code>destroy()</code> = counter band, <b>ek baar</b>.</li><li><code>HttpServletRequest</code> = form ka data: <code>request.getParameter("studentName")</code></li><li><code>HttpServletResponse</code> = jawab: <code>response.getWriter().println("Welcome")</code></li></ul>`,
  exam: `<p>2 marks: HttpServletRequest ka function (form data padhna, getParameter). 5 marks: lifecycle + WelcomeServlet code with HTML form.</p>`,
  yaad: 'init ek baar, service har baar, destroy ek baar.'
},
'u3-layered': {
  s: 'App ko layers mein baanto: Controller request leta hai, Service logic chalata hai, Repository database se baat karta hai.',
  ex: `<p>Restaurant: <b>waiter</b> order leta hai, <b>chef</b> khaana banata hai, <b>store keeper</b> godown se saamaan laata hai. Waiter khud khaana nahi banata, chef godown nahi jaata.</p>`,
  java: `<ul><li><code>@RestController</code> = waiter (request/response).</li><li><code>@Service</code> = chef (business logic, @Transactional).</li><li><code>@Repository</code> extends <code>JpaRepository</code> = store keeper (save, findAll free mein).</li><li><b>Hibernate</b> = store keeper ka translator, Java object ko SQL mein badalta hai.</li><li><b>Spring</b> sab layers ko jodta hai (DI) aur <code>application.properties</code> se database connect karta hai.</li></ul>`,
  exam: `<p>Layer diagram (Client → Controller → Service → Repository → Hibernate → DB) + har layer ka chhota code + application.properties.</p>`,
  yaad: 'Waiter → Chef → Store keeper → Godown.'
},
'u3-jsp': {
  s: 'JSP = HTML page jisme thoda Java code. Servlet + JSP + JDBC se form ka data database mein save karte hain.',
  ex: `<p>Ek <b>printed form</b> hai jisme kuch khaali jagah hai jo bharti hai (dynamic). Form = HTML, khaali jagah bharne wala = Java code.</p><p>Attendance: teacher form bharti hai → office (Servlet) register (database) mein likhta hai → "saved" ki parchi wapas.</p>`,
  java: `<ul><li><code>&lt;%@ %&gt;</code> Directive = settings/import/include. <code>&lt;% %&gt;</code> Scriptlet = Java code. <code>&lt;%= %&gt;</code> Expression = value print. <code>&lt;%! %&gt;</code> Declaration = variable/method banana. <code>&lt;jsp:include&gt;</code> = doosra page jodna. <code>\${msg}</code> EL = bina Java ke data dikhana.</li><li>Portal: attendance.jsp form → AttendanceServlet <code>getParameter()</code> → JDBC <code>INSERT</code> → success.jsp.</li></ul>`,
  exam: `<p>Q11 (compulsory): flow diagram + attendance.jsp + AttendanceServlet + SQL table. Q12 (OR): har component ka syntax + reusability (header include karo, EL se clean code).</p>`,
  yaad: 'JSP = dikhana, Servlet = karna, JDBC = save karna.'
},
'u3-bank': {
  s: 'Paise transfer mein do kaam hain (kaato + daalo). @Transactional ensure karta hai ki ya dono hon ya ek bhi nahi.',
  ex: `<p>Tumne dost ko UPI se ₹500 bheje. Tumhare account se kat gaye, par beech mein server down, dost ko mile nahi. Paise gaye kahan?! Bank aisa nahi hone de sakta.</p><p>Isliye rule: <b>ya toh poora transfer ho, ya kuch bhi nahi</b>. Gadbad hui toh tumhare paise wapas (rollback).</p>`,
  java: `<ul><li>Service method pe <code>@Transactional</code>: Spring pehle transaction start karta hai.</li><li>Sab theek → <b>commit</b> (dono changes save).</li><li><code>RuntimeException</code> aayi → <b>rollback</b> (sab undo).</li><li>Balance kam? <code>throw new InsufficientFundsException()</code>.</li><li><code>@ControllerAdvice</code> + <code>@ExceptionHandler</code> = ek jagah se sab errors pakad ke saaf JSON message bhejna.</li><li>Entities: Customer <code>@OneToMany</code> Account.</li></ul>`,
  exam: `<p>ACID likho, layered code (Entity, Repository, Service with @Transactional, Controller, ControllerAdvice), aur flow diagram (success → commit, failure → rollback).</p>`,
  yaad: 'Transfer = dono ya kuch nahi. Gadbad = rollback.'
}
};
