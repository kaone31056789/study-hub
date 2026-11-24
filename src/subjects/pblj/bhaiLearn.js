// "Bhai lang" step-by-step walkthroughs (casual Hinglish). Exam answers stay in English elsewhere.
export default {
'u0-basics': [
  { title: 'Class', body: `<p>Bhai, <b>class</b> ek naksha (blueprint) hai. Jaise builder ke paas ghar ka naksha hota hai: kitne kamre, kahan darwaza. Naksha khud ghar nahi hai.</p><pre>class Student {\n    String name;   // har student ka naam\n    int roll;      // roll number\n}</pre>` },
  { title: 'Object', body: `<p><b>Object</b> = naksha se bana asli ghar. <code>new</code> likha aur ek asli student ban gaya.</p><pre>Student s = new Student();\ns.name = "Asha";</pre><p>Ek class se 100 object bana sakte ho, jaise ek naksha se 100 ghar.</p>` },
  { title: 'Variable', body: `<p><b>Variable</b> = ek dabba jisme value rakhte ho, upar label laga ke. Dabba kis type ka hai woh batana padta hai:</p><p><code>int</code> = poora number (5) · <code>double</code> = decimal (5.5) · <code>char</code> = ek letter ('A') · <code>boolean</code> = true/false · <code>String</code> = text ("hello")</p>` },
  { title: 'Method', body: `<p><b>Method</b> = ek kaam jo object kar sakta hai. Input lo, kaam karo, output do.</p><pre>int add(int a, int b) {\n    return a + b;   // jawab wapas do\n}</pre><p>Jaise chai wale ko "2 chai" bola (input), usne chai di (output).</p>` },
  { title: 'main()', body: `<p>Har Java program <code>main()</code> se shuru hota hai. Ye ghar ka <b>main gate</b> hai, yahin se entry.</p><p><code>System.out.println("Hi");</code> = screen pe "Hi" print karo.</p>` },
  { title: 'Constructor', body: `<p><b>Constructor</b> = special method jiska naam class jaisa hota hai. Object bante hi apne aap chal jaata hai, starting values set karne ke liye. Jaise naya phone on karte hi setup screen.</p>` },
  { title: '@ wale words', body: `<p><code>@Override</code>, <code>@Service</code> jaise words <b>stickers</b> hain. Ye khud kaam nahi karte, Java ya Spring ko batate hain "isko aise treat karo". Unit 3 mein bahut dikhenge, darna mat.</p>` },
  { title: 'Poora map', body: `<p><b>Unit 1</b> = Java ke basic rules (class, OOP, errors).<br><b>Unit 2</b> = data store karna, ek saath kaam karna (collections, threads, files, database).<br><b>Unit 3</b> = Spring se website aur web service banana.</p><p>Bas itna samajh ke aage badho, sab connect hoga.</p>` }
],
'u1-jvm': [
  { title: 'Code likha', body: `<p>Tune <code>Hello.java</code> likha. Ye insaan ke padhne wala code hai. Computer isko seedha nahi samajhta.</p>` },
  { title: 'Compile', body: `<p><code>javac Hello.java</code> chalaya → <code>Hello.class</code> bani jisme <b>bytecode</b> hai.</p><p>Bytecode na Windows ki bhasha hai na Mac ki. Ye <b>JVM ki bhasha</b> hai, ek beech wali universal bhasha.</p>` },
  { title: 'JVM aaya', body: `<p><code>java Hello</code> chalaya toh <b>JVM</b> start hua. <b>Class Loader</b> ne file load ki, <b>Verifier</b> ne check kiya ki code safe hai (security yahin se aati hai).</p>` },
  { title: 'Execute', body: `<p><b>Execution Engine</b> chalata hai: <b>Interpreter</b> line by line padhta hai, <b>JIT</b> baar baar chalne wale code ko fast machine code bana deta hai, <b>Garbage Collector</b> bekaar objects ki safai karta hai.</p>` },
  { title: 'Kahin bhi chalao', body: `<p>Windows ka JVM alag, Linux ka alag, Mac ka alag. Par sab <b>same .class</b> chala lete hain. Isko bolte hain <b>platform independent</b> / WORA.</p>` },
  { title: 'JDK, JRE, JVM', body: `<p>Dabbe ke andar dabba:</p><p><b>JDK</b> (sab kuch + javac jaise tools, developer ke liye)<br>⊃ <b>JRE</b> (sirf chalane ke liye: JVM + libraries)<br>⊃ <b>JVM</b> (asli engine)</p><p>Exam mein ye nested box diagram zaroor banana.</p>` }
],
'u1-oop': [
  { title: 'OOP kya hai', body: `<p>Program ko <b>objects</b> mein todna, jaise real duniya: Student, Car, BankAccount. Har object ke paas data bhi hai aur kaam bhi. Iske 4 pillar hain.</p>` },
  { title: 'Encapsulation', body: `<p>Data ko <code>private</code> kar do, bahar wale seedha haath na lagaye. Access sirf <b>getter/setter</b> se, jo check bhi kar sakte hain.</p><p>Jaise bank balance: tu seedha number nahi badal sakta, ATM (method) se hi hoga aur wo check karega.</p>` },
  { title: 'Abstraction', body: `<p>Sirf zaroori cheez dikhao, andar ki detail chhupao. Tu <code>start()</code> dabata hai, engine kaise chalta hai nahi dekhta.</p><p>Java mein: <b>abstract class</b> aur <b>interface</b>.</p>` },
  { title: 'Inheritance', body: `<p>Bachcha baap se property leta hai: <code>class Dog extends Animal</code>. Dog ko Animal ka <code>eat()</code> free mein mil gaya. Code dobara likhna nahi pada, isko <b>reusability</b> bolte hain.</p>` },
  { title: 'Polymorphism', body: `<p>Ek naam, kai roop.</p><p><b>Overloading</b> (compile time): same naam, alag inputs, jaise <code>add(2,3)</code> aur <code>add(2,3,4)</code>.</p><p><b>Overriding</b> (runtime): child ne parent ka method apne tareeke se likha. <code>Animal a = new Dog(); a.sound();</code> → "Bark".</p>` },
  { title: 'Ek example mein sab', body: `<p>Employee payroll: <code>abstract class Employee</code> (abstraction) mein <code>private name</code> (encapsulation). FullTime aur PartTime usko <code>extends</code> karte hain (inheritance) aur <code>calculateSalary()</code> apne tareeke se likhte hain (polymorphism). 10 marks mein yahi example likhna.</p>` }
],
'u1-inherit': [
  { title: 'Inheritance', body: `<p>Ek class doosri class ki cheezein le leti hai <code>extends</code> se. Rishta hota hai <b>IS-A</b>: Dog <i>is an</i> Animal.</p>` },
  { title: 'Single', body: `<p>Ek baap, ek beta: <code>class B extends A</code>.</p>` },
  { title: 'Multilevel', body: `<p>Dada → Papa → Beta. <code>C extends B</code>, <code>B extends A</code>. Beta ko dada ki property bhi milti hai.</p>` },
  { title: 'Hierarchical', body: `<p>Ek baap, kai bachche: Dog aur Cat dono <code>extends Animal</code>.</p>` },
  { title: 'Multiple ka lafda', body: `<p>Ek bachche ke do baap (classes)? Java mana karta hai. Socho dono baap ke paas <code>show()</code> hai, bachcha kiska use kare? Confusion. Isko <b>Diamond Problem</b> kehte hain.</p>` },
  { title: 'Interface se jugaad', body: `<p><code>class C implements A, B</code>. Interface sirf bolta hai "ye method hona chahiye", body nahi deta. Body C khud likhta hai, toh koi confusion nahi. Isi tarah Java <b>multiple inheritance</b> achieve karta hai.</p>` }
],
'u1-overload': [
  { title: 'Overloading', body: `<p><b>Same class</b> mein same naam ke kai methods, par <b>parameters alag</b>: kitne hain, kis type ke hain, kis order mein hain.</p><p><code>add(int,int)</code>, <code>add(int,int,int)</code>, <code>add(double,double)</code></p>` },
  { title: 'Compiler kaise chunta hai', body: `<p>Tune <code>add(2.5, 3.5)</code> likha. Compiler dekhta hai: 2 arguments, dono double → <code>add(double,double)</code>. Ye decision <b>compile time</b> pe ho jaata hai (static binding).</p><p>Dhyan rakh: sirf <b>return type</b> alag karne se overloading nahi hota, error aayega.</p>` },
  { title: 'Overriding', body: `<p>Parent ka method, child mein <b>bilkul same naam aur same parameters</b> ke saath dobara likha. Upar <code>@Override</code> lagate hain.</p>` },
  { title: 'JVM kaise chunta hai', body: `<p><code>Animal a = new Dog(); a.sound();</code></p><p>Dabba (reference) Animal ka hai, par andar asli banda Dog hai. JVM <b>runtime</b> pe asli object dekhta hai aur Dog ka <code>sound()</code> chalata hai. Isko dynamic method dispatch kehte hain.</p>` },
  { title: 'Exam table', body: `<p>Difference table mein likhna: same class vs parent-child · parameters alag vs same · compile time vs runtime · inheritance chahiye ya nahi · static/private/final override nahi hote.</p>` }
],
'u1-access': [
  { title: 'Kyun chahiye', body: `<p>Access modifiers decide karte hain <b>kaun kya dekh sakta hai</b>. Data safe rakhne ke liye zaroori.</p>` },
  { title: 'private', body: `<p>Sirf <b>usi class</b> ke andar. Bahar se koi touch nahi kar sakta. Encapsulation isi se hota hai.</p>` },
  { title: 'default', body: `<p>Kuch nahi likha toh default. Sirf <b>same package</b> (same folder) wale dekh sakte hain.</p>` },
  { title: 'protected', body: `<p>Same package + <b>bachche classes</b> (subclass), chahe wo doosre package mein ho.</p>` },
  { title: 'public', body: `<p><b>Sab ke liye khula.</b> Kahin se bhi access.</p><p>Order yaad rakh: private → default → protected → public (chhota se bada).</p>` }
],
'u1-exception': [
  { title: 'Exception kya hai', body: `<p>Program chalte waqt koi gadbad: 0 se divide, galat input, file nahi mili. Handle nahi kiya toh program <b>crash</b>.</p>` },
  { title: 'try-catch', body: `<p>Risky code ko <code>try</code> mein rakho. Gadbad hui toh baaki try <b>skip</b> hoke seedha matching <code>catch</code> mein jaata hai. Program chalta rehta hai, crash nahi.</p>` },
  { title: 'finally', body: `<p><code>finally</code> <b>hamesha</b> chalta hai, exception aaye ya na aaye. File band karna, DB connection band karna yahin hota hai.</p>` },
  { title: 'throw vs throws', body: `<p><code>throw</code> = khud exception phenkna, method ke andar: <code>throw new ArithmeticException()</code>.</p><p><code>throws</code> = method ke naam ke saath warning: <code>void read() throws IOException</code>, matlab "main exception de sakta hoon, tum sambhalna".</p>` },
  { title: 'Checked vs Unchecked', body: `<p><b>Checked</b>: compiler pehle hi pakad leta hai, handle karna compulsory (IOException, SQLException).</p><p><b>Unchecked</b>: RuntimeException wali family, chalte waqt aati hai (NullPointerException, ArithmeticException).</p><p><b>Error</b> alag hai: system level, recover nahi hota (OutOfMemoryError).</p>` }
],
'u1-custom': [
  { title: 'Kyun banaye', body: `<p>Java ki exceptions generic hain. Tere app ke rules apne hain: "18 se kam age", "balance kam". Inke liye apna naam wala exception better, code padhne mein clear.</p>` },
  { title: 'Banao', body: `<pre>class AgeException extends Exception {\n    AgeException(String msg) { super(msg); }\n}</pre><p><code>super(msg)</code> message ko parent ko de deta hai, taaki <code>getMessage()</code> chale.</p>` },
  { title: 'Phenko', body: `<p>Jahan rule check hota hai: <code>if (age &lt; 18) throw new AgeException("Too young");</code> aur method pe <code>throws AgeException</code> likho.</p>` },
  { title: 'Pakdo', body: `<p>Call karne wala <code>try { register(15); } catch (AgeException e) { print(e.getMessage()); }</code>. ATM wale 10 marks mein bhi yahi pattern hai, bas InsufficientFundsException.</p>` }
],
'u2-collections': [
  { title: 'Problem', body: `<p>Array ka size fix hota hai, aur search/sort sab khud likhna padta hai. Collection Framework = <b>ready-made data structures</b> <code>java.util</code> mein.</p>` },
  { title: 'List', body: `<p><b>Order</b> maintain, <b>duplicate allowed</b>, index se access. ArrayList, LinkedList. Jaise class ki attendance list.</p>` },
  { title: 'Set', body: `<p><b>Duplicate nahi</b>. HashSet (order random), TreeSet (sorted). Jaise unique roll numbers.</p>` },
  { title: 'Queue', body: `<p><b>FIFO</b>: pehle aao pehle jao. Jaise canteen ki line.</p>` },
  { title: 'Map', body: `<p><b>Key → Value</b> jodi. Key unique. HashMap, TreeMap. Jaise roll no → naam. Dhyan: Map, Collection ka bachcha <b>nahi</b> hai, alag family.</p>` },
  { title: 'Exam mein', body: `<p>Hierarchy ka tree diagram banao (Collection → List/Set/Queue, alag se Map), phir ArrayList, LinkedList, HashSet, HashMap ek-ek para mein example ke saath.</p>` }
],
'u2-al-ll': [
  { title: 'ArrayList andar se', body: `<p>Andar ek <b>array</b> hai jo bhar jaane pe bada ho jaata hai. Sab elements line mein, numbered.</p>` },
  { title: 'LinkedList andar se', body: `<p>Har element ek <b>node</b>: data + pichle ka address + agle ka address. Chain jaisa.</p>` },
  { title: 'get(i)', body: `<p>ArrayList: seedha index pe jump, <b>fast</b> (O(1)). LinkedList: shuru se gin gin ke jaana, <b>slow</b> (O(n)).</p>` },
  { title: 'Beech mein add/remove', body: `<p>ArrayList: baaki sabko <b>khiskana</b> padta hai, slow. LinkedList: bas 2 links badlo, fast.</p>` },
  { title: 'Kab kya', body: `<p>Zyada <b>padhna</b> → ArrayList. Zyada <b>add/delete</b> → LinkedList. LinkedList memory zyada khaata hai (har node mein 2 extra address).</p>` }
],
'u2-hm-tm': [
  { title: 'Dono same kya', body: `<p>Dono <b>Map</b> hain: key → value, key unique.</p>` },
  { title: 'HashMap', body: `<p>Key ka <b>hashCode</b> nikaal ke seedha bucket mein daal deta hai. Super <b>fast</b> (O(1)) par <b>order ka koi bharosa nahi</b>. Ek <code>null</code> key chalti hai.</p>` },
  { title: 'TreeMap', body: `<p>Andar <b>Red-Black tree</b>. Keys hamesha <b>sorted</b>. Thoda slow (O(log n)). <code>null</code> key nahi chalegi, kyunki compare nahi ho sakti.</p>` },
  { title: 'Kab kya', body: `<p>Bas fast lookup chahiye → HashMap. Sorted order / range chahiye (firstKey, lastKey) → TreeMap. Exam mein 6-8 row ki table banao.</p>` }
],
'u2-thread-life': [
  { title: 'Thread kya', body: `<p>Thread = program ke andar ek <b>chhota worker</b>. Kai threads = ek saath kai kaam, jaise song download ho raha hai aur tu chat bhi kar raha hai.</p>` },
  { title: 'New → Runnable', body: `<p><code>new Thread()</code> = worker hire hua (<b>New</b>). <code>start()</code> bola = line mein lag gaya, CPU ka wait (<b>Runnable</b>).</p>` },
  { title: 'Running', body: `<p>Scheduler ne bola "chal tera number" → <b>Running</b>, <code>run()</code> ka code chal raha hai.</p>` },
  { title: 'Waiting / Blocked', body: `<p><code>sleep()</code> = thodi der so ja. <code>wait()</code>/<code>join()</code> = kisi aur ka wait. Lock busy = <b>Blocked</b>. Kaam hua toh wapas Runnable line mein.</p>` },
  { title: 'Terminated', body: `<p><code>run()</code> khatam = thread <b>dead</b>. Dobara <code>start()</code> kiya toh IllegalThreadStateException.</p>` },
  { title: '2 tareeke', body: `<p>1) <code>extends Thread</code> aur <code>run()</code> likho.<br>2) <code>implements Runnable</code>, phir <code>new Thread(obj).start()</code>.</p><p>Runnable better hai kyunki Java mein ek hi class extend kar sakte ho, wo slot bacha rehta hai.</p>` }
],
'u2-sync': [
  { title: 'Problem', body: `<p>Do threads ek hi data ko ek saath badlein toh result galat ho sakta hai. IRCTC pe 1 seat, 2 log ek hi second mein book → dono ko mil gayi! Isko <b>race condition</b> bolte hain.</p>` },
  { title: 'synchronized', body: `<p>Har object ke paas ek <b>taala (lock)</b> hota hai. <code>synchronized</code> method mein ghusne ke liye taala chahiye. Ek thread andar gaya, doosra bahar <b>BLOCKED</b> khada wait karega.</p>` },
  { title: 'Fayda / Nuksaan', body: `<p><b>Fayda</b>: data sahi rehta hai, double booking nahi.<br><b>Nuksaan</b>: threads wait karte hain toh slow; galti se <b>deadlock</b> (dono ek doosre ka wait karte reh gaye).</p>` },
  { title: 'Priority', body: `<p>1 se 10: <code>MIN_PRIORITY = 1</code>, <code>NORM_PRIORITY = 5</code> (default), <code>MAX_PRIORITY = 10</code>. High priority wale ko scheduler <i>prefer</i> karta hai, par <b>guarantee nahi</b>. OS pe depend karta hai.</p>` },
  { title: 'Even/Odd program', body: `<p>EvenThread 2,4…20 print kare, OddThread 1,3…19. Dono ko <code>start()</code> karo, ek pe <code>setPriority(10)</code>, doosre pe 1. Output mix aayega, yahi samjhana hai ki priority bas hint hai.</p>` }
],
'u2-lambda': [
  { title: 'Pehle ka tareeka', body: `<p>Chhota sa kaam (jaise sort karne ka rule) dene ke liye poori <b>anonymous class</b> likhni padti thi, 5-6 line ka bakwaas.</p>` },
  { title: 'Lambda', body: `<p>Java 8 se: <code>(a, b) -> a - b</code>. Bina naam ka chhota function.</p><p>Format: <code>(input) -> output</code>. Ek line hai toh na braces na return.</p>` },
  { title: 'Functional interface', body: `<p>Lambda tabhi chalega jab interface mein <b>sirf ek abstract method</b> ho. Isko functional interface kehte hain. Upar <code>@FunctionalInterface</code> laga sakte ho.</p>` },
  { title: 'Built-in wale', body: `<p><b>Predicate</b> = check karo, true/false do.<br><b>Function</b> = ek cheez lo, doosri do.<br><b>Consumer</b> = lo aur kuch karo, wapas kuch nahi.<br><b>Supplier</b> = kuch mat lo, bas do.</p>` },
  { title: 'Method reference', body: `<p>Lambda bhi lamba lage toh: <code>System.out::println</code>, <code>String::toUpperCase</code>. Same kaam, aur chhota.</p>` }
],
'u2-stream': [
  { title: 'Stream kya', body: `<p>List pe kaam karne ka naya tareeka. Loop likhne ki jagah bolo <b>kya</b> chahiye. Original list badalti nahi.</p>` },
  { title: 'Pipeline', body: `<p><b>Source</b> (<code>list.stream()</code>) → beech ke steps → <b>end step</b>.</p>` },
  { title: 'filter, map, sorted', body: `<p><code>filter(x -> x > 75)</code> = sirf 75 se upar wale rakho.<br><code>map(s -> s.name)</code> = har cheez ko badlo.<br><code>sorted()</code> = line mein lagao.</p><p>Ye <b>lazy</b> hain: end step ke bina kuch nahi chalta.</p>` },
  { title: 'reduce, collect', body: `<p><code>reduce(0, (a,b) -> a+b)</code> = sabko jod ke ek value.<br><code>collect(Collectors.toList())</code> = result wapas list mein. Ye <b>terminal</b> (end) operations hain.</p>` },
  { title: 'Example', body: `<p>[45, 80, 92] → filter(>75) → [80, 92] → map(×2) → [160, 184] → reduce(+) → 344. Exam mein aise hi chain dikha do.</p>` }
],
'u2-jdbc': [
  { title: 'JDBC kya', body: `<p>Java ko database se baat karni hai. <b>JDBC</b> = wo API (<code>java.sql</code>) jo ye kaam karwati hai.</p>` },
  { title: 'Driver', body: `<p>Har database ki apni bhasha. <b>Driver</b> = translator. 4 type: 1 bridge, 2 native, 3 network, <b>4 thin (pure Java)</b>, MySQL wala Type 4 hai.</p>` },
  { title: '5 steps', body: `<p>1) Driver load: <code>Class.forName()</code><br>2) Connection: <code>DriverManager.getConnection(url, user, pass)</code><br>3) Statement banao<br>4) Query chalao: SELECT ke liye <code>executeQuery</code>, baaki ke liye <code>executeUpdate</code><br>5) <code>close()</code></p>` },
  { title: 'Statement vs Prepared', body: `<p><b>Statement</b>: input seedha SQL mein jud jaata hai, hacker <code>' OR '1'='1</code> daal ke sab data nikaal lega (SQL injection).</p><p><b>PreparedStatement</b>: <code>?</code> lagao, value baad mein set karo. Input sirf data maana jaata hai. <b>Safe aur fast.</b></p>` },
  { title: 'Transaction & MVC', body: `<p><code>setAutoCommit(false)</code> → sab theek toh <code>commit()</code>, gadbad toh <code>rollback()</code>.</p><p>MVC: Student class = Model, menu = View, DB wali class = Controller.</p>` }
],
'u2-io': [
  { title: 'Stream = pipe', body: `<p>Data ek jagah se doosri jagah behta hai: file se program, program se file.</p>` },
  { title: 'Byte stream', body: `<p>8-bit <b>bytes</b>. Image, audio, video jaisa binary data. <code>InputStream</code>/<code>OutputStream</code> family.</p>` },
  { title: 'Character stream', body: `<p>16-bit <b>characters</b> (Unicode), text ke liye. <code>Reader</code>/<code>Writer</code> family.</p><p><b>FileReader</b> = file se character padho. <b>BufferedReader</b> = buffer ke saath fast, <code>readLine()</code> se poori line ek baar mein. <b>FileWriter</b> = file mein likho.</p>` },
  { title: 'Wrapper & autoboxing', body: `<p>Collections sirf object rakhte hain, primitive nahi. Isliye <b>wrapper</b>: int → Integer, char → Character.</p><p><b>Autoboxing</b>: <code>Integer x = 10;</code> apne aap. <b>Unboxing</b>: <code>int y = x;</code> apne aap.</p>` }
],
'u2-serial': [
  { title: 'Problem', body: `<p>Program band hua, RAM ke saare objects gayab. Employees ki list bachani hai? File mein save karo.</p>` },
  { title: 'Serializable', body: `<p>Class pe <code>implements Serializable</code> lagao. Ye <b>marker interface</b> hai, koi method nahi, bas "allowed" ka thappa.</p>` },
  { title: 'Save', body: `<p><code>ObjectOutputStream</code> ka <code>writeObject(list)</code> → object <b>bytes</b> ban ke file mein. Ye <b>serialization</b>.</p>` },
  { title: 'Load', body: `<p><code>ObjectInputStream</code> ka <code>readObject()</code> → file se wahi object wapas. Ye <b>deserialization</b>. <code>transient</code> field (jaise password) save hi nahi hoti, wapas <code>null</code> aati hai.</p>` },
  { title: 'Menu app', body: `<p>Start pe file se list load. Menu: <b>1 Add</b> (list mein daalo, save) · <b>2 View</b> (sab print) · <b>3 Delete</b> (id se hatao, save) · <b>4 Exit</b>. Bas yahi 10 marks ka answer hai.</p>` }
],
'u3-ioc': [
  { title: 'Problem', body: `<p><code>class Car { Engine e = new PetrolEngine(); }</code>. Car khud engine bana raha hai. Electric chahiye? Car ka code badlo. Isko <b>tight coupling</b> kehte hain.</p>` },
  { title: 'IoC', body: `<p><b>Inversion of Control</b>: objects banane ka control tujhse lekar <b>Spring container</b> ko de diya. Wo objects (beans) banata hai aur jodta hai.</p>` },
  { title: 'DI', body: `<p><b>Dependency Injection</b>: Car ko jo chahiye (Engine), Spring bahar se de deta hai. Car bas maangta hai. Engine badlo, Car ka code same.</p>` },
  { title: '3 tareeke', body: `<p><b>Constructor</b>: object bante waqt hi de do (best, final bhi ban sakta hai).<br><b>Setter</b>: baad mein setter se (optional cheezon ke liye).<br><b>Field</b>: seedha field pe <code>@Autowired</code> (chhota par test karna mushkil).</p>` },
  { title: 'Bean lifecycle', body: `<p>Bana → dependencies mili → <code>@PostConstruct</code> (init) → use hua → band hote waqt <code>@PreDestroy</code>.</p>` }
],
'u3-annot': [
  { title: '@Component', body: `<p>"Spring, is class ka object tu bana aur sambhal." Spring scan karke dhoondh leta hai.</p>` },
  { title: '@Service / @Repository', body: `<p>Same kaam, bas label se pata chalta hai kaunsi layer: <code>@Service</code> = business logic, <code>@Repository</code> = database wala (DB errors ko Spring ke format mein badalta bhi hai).</p>` },
  { title: '@Autowired', body: `<p>"Mujhe is type ka object la ke de." Spring type dekh ke inject kar deta hai.</p>` },
  { title: '@Configuration + @Bean', body: `<p><code>@Configuration</code> class mein <code>@Bean</code> methods likho, jo object return karein wo bean ban jaata hai. Doosre ki library ki class pe sticker nahi laga sakte, tab ye kaam aata hai.</p>` }
],
'u3-jpa': [
  { title: 'ORM', body: `<p>SQL likhne ki jagah Java objects se kaam. <b>Class = table, object = row, field = column.</b> JPA = rules, Hibernate = jo rules follow karke SQL banata hai.</p>` },
  { title: '@Entity, @Table', body: `<p><code>@Entity</code> = "ye class ek table hai". <code>@Table(name="students")</code> = table ka naam ye rakho.</p>` },
  { title: '@Id, @GeneratedValue', body: `<p><code>@Id</code> = primary key. <code>@GeneratedValue(IDENTITY)</code> = id apne aap badhti rahegi (1, 2, 3…).</p>` },
  { title: 'One-to-One', body: `<p>Ek banda, ek passport. <code>@OneToOne</code> + <code>@JoinColumn</code> se foreign key.</p>` },
  { title: 'One-to-Many', body: `<p>Ek department, bahut employees. Foreign key <b>employee table</b> mein (many wali side, <code>@ManyToOne</code>). Department pe <code>mappedBy</code>.</p>` },
  { title: 'Many-to-Many', body: `<p>Bahut students, bahut courses. Teesri <b>join table</b> chahiye (student_id, course_id), <code>@JoinTable</code> se.</p>` }
],
'u3-rest': [
  { title: 'REST', body: `<p>Programs aapas mein web pe baat karte hain. Har cheez ka ek <b>URL</b> (<code>/students/1</code>) aur action <b>HTTP method</b> se.</p>` },
  { title: 'CRUD', body: `<p>Create = <b>POST</b> (201) · Read = <b>GET</b> (200) · Update = <b>PUT</b> (200) · Delete = <b>DELETE</b> (204) · Nahi mila = <b>404</b>.</p>` },
  { title: '@RestController', body: `<p>Class pe lagao, return kiya object apne aap <b>JSON</b> ban ke jaata hai (Jackson karta hai). <code>@RequestMapping("/students")</code> = base URL.</p>` },
  { title: '@PathVariable', body: `<p>URL se value nikaalo: <code>/students/5</code> → <code>@PathVariable int id</code> = 5.</p>` },
  { title: '@RequestBody', body: `<p>Request ke JSON body ko Java object bana do: POST mein naya student bhejte hain.</p>` },
  { title: 'Test', body: `<p>Postman se request bhejo, status code aur JSON dekho. Doosre Java program se call karna ho toh <code>RestTemplate</code> ya <code>WebClient</code>.</p>` }
],
'u3-patterns': [
  { title: 'Pattern kya', body: `<p>Common problems ke <b>proven solutions</b>. 3 group: <b>Creational</b> (object kaise bane), Structural, <b>Behavioral</b> (objects aapas mein kaise baat karein).</p>` },
  { title: 'Singleton', body: `<p>Class ka <b>sirf ek object</b>. Recipe: <b>private constructor</b> (koi new na kar sake) + <b>static instance</b> + <code>getInstance()</code> jo hamesha wahi object de. Logger, DB connection.</p>` },
  { title: 'Factory', body: `<p>Tu bolta hai "circle chahiye", factory <code>new Circle()</code> bana ke deti hai. Tujhe <code>new</code> likhna hi nahi padta.</p>` },
  { title: 'Observer', body: `<p>Subscribe system. Naya product aaya → inventory, email, sabko apne aap notify.</p>` },
  { title: 'Strategy', body: `<p>Same kaam ke alag tareeke, runtime pe chuno. Car/Bike/Truck insurance, har ek ka premium alag formula.</p>` }
],
'u3-servlet': [
  { title: 'Servlet kya', body: `<p>Server (Tomcat) pe chalne wali Java class jo browser ki <b>request</b> lekar <b>response</b> (HTML) bhejti hai.</p>` },
  { title: 'init()', body: `<p>Pehli request pe Tomcat object banata hai aur <code>init()</code> <b>ek hi baar</b> chalata hai. Setup yahan.</p>` },
  { title: 'service()', body: `<p><b>Har request</b> pe chalta hai. GET hai toh <code>doGet()</code>, POST hai toh <code>doPost()</code>.</p>` },
  { title: 'destroy()', body: `<p>Server band hote waqt <b>ek baar</b>. Safai yahan.</p>` },
  { title: 'Request / Response', body: `<p><code>HttpServletRequest</code> = andar aaya data: <code>request.getParameter("studentName")</code> se form ka naam nikaalo.</p><p><code>HttpServletResponse</code> = jawab: <code>setContentType("text/html")</code>, <code>getWriter().println("Welcome")</code>.</p>` }
],
'u3-layered': [
  { title: 'Layers kyun', body: `<p>Sab code ek jagah = jhamela. Har kaam ki alag layer, har layer sirf neeche wali se baat kare.</p>` },
  { title: 'Controller', body: `<p><code>@RestController</code>: request leta hai, response deta hai. Logic nahi likhta, service ko bolta hai.</p>` },
  { title: 'Service', body: `<p><code>@Service</code>: asli dimaag. Business rules, calculations, <code>@Transactional</code>.</p>` },
  { title: 'Repository / DAO', body: `<p><code>@Repository</code> interface jo <code>JpaRepository</code> extend kare. <code>save, findAll, findById, deleteById</code> free mein mil jaate hain.</p>` },
  { title: 'Hibernate + Spring', body: `<p>Hibernate object ko SQL mein badalta hai. Spring layers ko aapas mein jodta hai (DI) aur <code>application.properties</code> se DB setup khud kar leta hai.</p>` }
],
'u3-jsp': [
  { title: 'JSP kya', body: `<p>HTML page jisme chhota Java code. Design karna easy. Server isko andar se servlet bana deta hai.</p>` },
  { title: 'Lifecycle', body: `<p>.jsp → .java (translate) → .class (compile) → <code>jspInit()</code> → <code>_jspService()</code> har request pe → <code>jspDestroy()</code>.</p>` },
  { title: 'Components', body: `<p><code>&lt;%@ %&gt;</code> directive (import, include, taglib) · <code>&lt;% %&gt;</code> scriptlet (Java code) · <code>&lt;%= %&gt;</code> expression (value print) · <code>&lt;%! %&gt;</code> declaration (variable/method) · <code>&lt;jsp:include&gt;</code> include action · <code>\${ }</code> EL (bina Java ke data).</p>` },
  { title: 'Reusability', body: `<p>Header/footer ek baar likho, include se har page pe. EL aur JSTL se page mein Java kam, toh page saaf aur reusable.</p>` },
  { title: 'Attendance portal', body: `<p>attendance.jsp ka form → POST → AttendanceServlet <code>getParameter()</code> se data → JDBC <code>PreparedStatement</code> INSERT → success.jsp pe message. JSP = View, Servlet = Controller.</p>` }
],
'u3-bank': [
  { title: 'Problem', body: `<p>Transfer = A se kaato + B mein daalo. Beech mein crash hua toh A ka paisa gaya, B ko mila nahi. Bank ka toh band baj jaayega.</p>` },
  { title: 'Transaction', body: `<p>Sab steps ek unit: <b>ya sab, ya kuch nahi</b>. <b>ACID</b>: Atomicity, Consistency, Isolation, Durability.</p>` },
  { title: '@Transactional', body: `<p>Service method pe lagao. Spring shuru mein transaction start karta hai, sab theek toh <b>commit</b>, <b>RuntimeException</b> aayi toh <b>rollback</b>, sab undo.</p>` },
  { title: 'Entities', body: `<p>Customer <code>@OneToMany</code> Account, Account <code>@ManyToOne</code> Customer (foreign key account mein). Repository <code>JpaRepository</code> se.</p>` },
  { title: 'Error handling', body: `<p>Balance kam? <code>throw new InsufficientFundsException()</code>. <code>@ControllerAdvice</code> class ka <code>@ExceptionHandler</code> isko pakad ke saaf <b>JSON error</b> (400) bhejta hai, har controller ke liye ek jagah se.</p>` }
]
};
