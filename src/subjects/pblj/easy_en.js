// Beginner-first explainer (English). Written for someone who has never seen Java.
// s = one-line idea, story = real-life story, words = [term, plain meaning], how = tiny steps, exam = what to write, yaad = memory line
export default {
'u0-basics': {
  s: 'A Java program is a set of instructions, organised into "classes" (designs) and "objects" (real things made from those designs).',
  story: 'Think of a cookie cutter. The cutter is the design. Every cookie you press out is a real cookie. One cutter, many cookies.',
  words: [['Class', 'A design or template, like the cookie cutter.'], ['Object', 'A real thing made from the class, like one cookie.'], ['Variable', 'A labelled box that stores a value (a name, a number).'], ['Method', 'An action the object can do, like "bake()" or "eat()".'], ['main()', 'The starting point. Java begins reading your program here.']],
  how: ['You write a class: the design.', 'You create an object with the word <code>new</code>.', 'You give the object values (name = "Asha").', 'You ask the object to do something by calling a method.'],
  exam: 'Not an exam question. Just remember the words class, object, variable and method, because every topic uses them.',
  yaad: 'Class = cookie cutter. Object = cookie. Method = what the cookie can do.'
},
'u1-jvm': {
  s: 'You write Java once, and it runs on any computer, because every computer has a "Java player" called the JVM.',
  story: 'You record a song as an MP3. It plays on a phone, a laptop and a car stereo, because each has an MP3 player. The song is the same; only the player is different.',
  words: [['Compiler (javac)', 'A translator that turns your code into bytecode.'], ['Bytecode', 'The "MP3 file" of Java: a .class file every JVM understands.'], ['JVM', 'Java Virtual Machine: the player that runs bytecode on your computer.'], ['JRE', 'JVM + ready-made libraries. Enough to RUN Java.'], ['JDK', 'JRE + tools like the compiler. Needed to WRITE Java.']],
  how: ['You write Hello.java.', 'The compiler turns it into Hello.class (bytecode).', 'The JVM on any computer reads the bytecode.', 'The JVM turns it into that computer\'s own language and runs it.'],
  exam: 'Write: bytecode is platform-independent code made by javac; the JVM converts it to machine code, so Java is "Write Once, Run Anywhere". Draw boxes: JDK contains JRE, JRE contains JVM. List JVM parts: Class Loader, Memory (Heap, Stack), Execution Engine.',
  yaad: 'Bytecode = MP3, JVM = player. JDK ⊃ JRE ⊃ JVM.'
},
'u1-oop': {
  s: 'OOP (Object-Oriented Programming) has 4 big ideas: hide data, hide details, reuse code, and let one name do different things.',
  story: 'A TV remote: the circuits are sealed inside (hidden data). You press "power" without knowing the electronics (hidden details). A smart TV remote is still a remote, with extra buttons (reuse). The "OK" button does different things on different screens (one name, many actions).',
  words: [['Encapsulation', 'Keep data private; let others use it only through safe methods.'], ['Abstraction', 'Show WHAT something does, hide HOW it does it.'], ['Inheritance', 'A new class gets everything from an existing class (extends).'], ['Polymorphism', '"Many forms": the same method name behaves differently.'], ['private', 'A word that locks a variable so only its own class can touch it.']],
  how: ['Make variables private (encapsulation).', 'Write an abstract class that only names the actions (abstraction).', 'Make child classes that extend it (inheritance).', 'Each child writes its own version of the action (polymorphism).'],
  exam: 'Define all four with one example each. For 10 marks, use the Employee example: abstract Employee with private name, FullTime and PartTime extend it, each writes its own calculateSalary().',
  yaad: 'A PIE: Abstraction, Polymorphism, Inheritance, Encapsulation.'
},
'u1-inherit': {
  s: 'Inheritance means a child class automatically gets the features of a parent class.',
  story: 'You inherit your family surname and house from your parents. You did not build them; you just got them. A child with two fathers would be confusing, so Java allows only one parent class.',
  words: [['extends', 'The keyword that says "this class inherits from that one".'], ['Parent / superclass', 'The class whose features are given.'], ['Child / subclass', 'The class that receives the features.'], ['Interface', 'A list of promises ("you must have these methods") with no code inside.'], ['Diamond problem', 'Confusion when two parents have the same method: which one to use?']],
  how: ['Single: one parent, one child.', 'Multilevel: grandparent → parent → child.', 'Hierarchical: one parent, many children.', 'Multiple parents are NOT allowed with classes (diamond problem).', 'Use interfaces instead: a class can implement many interfaces.'],
  exam: 'Draw small diagrams of each type. Write: multiple inheritance is not supported with classes because of the diamond problem; it is achieved using interfaces.',
  yaad: 'Classes: one parent only. Interfaces: as many as you like.'
},
'u1-overload': {
  s: 'Overloading = same method name, different inputs. Overriding = a child class rewrites the parent\'s method.',
  story: 'Overloading: at a tea stall, "one tea", "one tea with less sugar" and "two teas" are all "tea" orders, but different inputs give different results. Overriding: your mother\'s dal recipe, made your own way. Whoever is cooking decides which recipe is used.',
  words: [['Method', 'A named action, like add().'], ['Parameters', 'The inputs given to a method, inside the brackets.'], ['Compile time', 'When the code is checked and translated, before it runs.'], ['Runtime', 'While the program is actually running.'], ['@Override', 'A label that says "I am rewriting the parent\'s method".']],
  how: ['Overloading: write add(int, int) and add(int, int, int) in one class.', 'The compiler looks at how many inputs, their types and their order, and picks the right one before running.', 'Overriding: parent Animal has sound(); child Dog writes its own sound().', 'While running, Java uses the version of the real object (Dog), not the label (Animal).'],
  exam: 'Write a Calculator program with 3 add() methods. Explain: the compiler chooses by number, type and order of parameters at compile time. Add a difference table (same class vs parent-child, compile time vs runtime).',
  yaad: 'Overloading = different inputs. Overriding = different recipe.'
},
'u1-access': {
  s: 'Access modifiers decide who is allowed to see or use a variable or method.',
  story: 'Your diary (only you), the family fridge (everyone at home), family jewellery (family plus children who moved away), a park bench (anyone).',
  words: [['private', 'Only inside the same class.'], ['default', 'No keyword written. Only inside the same package (folder).'], ['protected', 'Same package, plus child classes anywhere.'], ['public', 'Everyone, everywhere.'], ['Package', 'A folder that groups related classes.']],
  how: ['Write the keyword before a variable or method.', 'Java checks who is trying to use it.', 'If they are not allowed, the code does not even compile.'],
  exam: 'Draw a 4 × 4 table: rows private, default, protected, public; columns same class, same package, subclass, other package. Fill ticks and crosses.',
  yaad: 'Diary → Fridge → Jewellery → Bench.'
},
'u1-exception': {
  s: 'An exception is a problem that happens while the program runs. If you handle it, the program keeps going instead of crashing.',
  story: 'You are riding a scooter and get a flat tyre (exception). If you carry a spare (catch), you change it and keep going. If not, you are stuck (crash). Locking the scooter at home happens every time, flat tyre or not (finally).',
  words: [['try', 'Put risky code here.'], ['catch', 'What to do if something goes wrong.'], ['finally', 'Code that ALWAYS runs at the end (cleanup).'], ['throw', 'Raise an exception yourself.'], ['throws', 'A warning on a method: "this may cause an exception, the caller must handle it".']],
  how: ['Java runs the code inside try.', 'If an error happens, it jumps straight to the matching catch.', 'The rest of try is skipped.', 'finally runs either way, and the program continues.'],
  exam: 'Draw the hierarchy: Throwable → Error and Exception; Exception → checked (IOException) and RuntimeException (unchecked, e.g. NullPointerException). Explain try, catch, finally, throw, throws, plus throw vs throws and checked vs unchecked tables.',
  yaad: 'try = ride, catch = spare tyre, finally = always lock.'
},
'u1-custom': {
  s: 'You can create your own exception with a clear name, so the error message explains exactly what went wrong.',
  story: 'At a voting booth, a 15-year-old is told "You are under 18". That is a specific reason, much clearer than a vague "error".',
  words: [['Custom exception', 'Your own error type, e.g. AgeException.'], ['extends Exception', 'Makes your class a real exception.'], ['super(message)', 'Passes the message to the parent so getMessage() can show it.'], ['getMessage()', 'Returns the error message text.']],
  how: ['Create the class: <code>class AgeException extends Exception</code>.', 'Add a constructor that calls <code>super(message)</code>.', 'Where the rule is checked, write <code>throw new AgeException("Too young")</code>.', 'Add <code>throws AgeException</code> to that method.', 'The caller uses try-catch and prints e.getMessage().'],
  exam: 'Write these 5 steps with a short program and its output. The ATM question is the same idea with InsufficientFundsException.',
  yaad: 'Create it → throw it → declare it (throws) → catch it.'
},
'u2-collections': {
  s: 'Collections are ready-made containers for storing many items, so you do not have to build your own.',
  story: 'At home you use different containers: a numbered register (order matters), a box of unique keys (no duplicates), a queue at the bank (first come, first served), and a phone contact list (name → number).',
  words: [['List', 'Ordered items, duplicates allowed (ArrayList, LinkedList).'], ['Set', 'No duplicates allowed (HashSet).'], ['Queue', 'First in, first out.'], ['Map', 'Key → value pairs, like name → phone number (HashMap).'], ['java.util', 'The package where all these live.']],
  how: ['Pick the container that fits: List, Set, Queue or Map.', 'Create it, e.g. <code>new ArrayList&lt;&gt;()</code>.', 'Use add(), remove(), get() and so on.', 'Java handles growing, searching and sorting for you.'],
  exam: 'Draw the hierarchy tree (Collection → List, Set, Queue; Map separate). Explain ArrayList, LinkedList, HashSet and HashMap in 3-4 lines each with a tiny example.',
  yaad: 'List = register, Set = unique, Queue = line, Map = contacts.'
},
'u2-al-ll': {
  s: 'ArrayList is fast at finding an item by position; LinkedList is fast at inserting or removing items in the middle.',
  story: 'Cinema seats (ArrayList): you can walk straight to seat 50, but squeezing someone into seat 3 means everyone after must shift. People holding hands in a line (LinkedList): finding the 50th person means counting one by one, but adding someone just needs two people to let go and re-hold.',
  words: [['Index', 'The position number of an item (starts at 0).'], ['get(i)', 'Fetch the item at position i.'], ['Node', 'One link in a LinkedList: the item plus pointers to its neighbours.']],
  how: ['ArrayList stores items side by side, so jumping to any position is instant.', 'Inserting in the middle shifts everything after it.', 'LinkedList stores items as a chain of nodes.', 'Inserting just changes two links, but finding a position means walking the chain.'],
  exam: 'Write a difference table (6-8 rows): structure, speed of get(i), speed of insert/delete, memory, when to use which.',
  yaad: 'ArrayList = fast access. LinkedList = fast insert/delete.'
},
'u2-hm-tm': {
  s: 'Both store key → value pairs. HashMap is faster but has no order; TreeMap keeps keys sorted.',
  story: 'HashMap is your bag: you find things quickly, but everything is jumbled. TreeMap is a library shelf: books in alphabetical order, slightly slower to use, always neat.',
  words: [['Key', 'The label you look things up by (e.g. a name).'], ['Value', 'The data stored under that key (e.g. a phone number).'], ['Sorted', 'Arranged in order, like A to Z.'], ['null', 'Empty, nothing.']],
  how: ['HashMap uses a hash (a quick calculated address) to store each key.', 'Lookups are very fast, but the order is random.', 'TreeMap stores keys in a sorted tree.', 'Lookups are a bit slower, but keys always come out in order. TreeMap does not allow a null key.'],
  exam: 'Difference table: structure, order, speed, null key allowed or not, extra methods (TreeMap has firstKey, lastKey).',
  yaad: 'HashMap = bag (fast, messy). TreeMap = shelf (sorted).'
},
'u2-thread-life': {
  s: 'A thread is a small worker inside a program. It goes through 5 stages in its life.',
  story: 'A new employee: hired (New) → waiting for a desk (Runnable) → working at the desk (Running) → on a tea break or waiting for the boss (Waiting) → retired (Terminated). A retired employee cannot be re-hired.',
  words: [['Thread', 'One path of work. Many threads = doing many things at once.'], ['start()', 'Tells the thread to get ready to run.'], ['run()', 'The actual work the thread does.'], ['sleep()', 'Pause for some time.'], ['join()', 'Wait for another thread to finish.']],
  how: ['New: the thread object is created.', 'Runnable: start() is called; it waits for its turn.', 'Running: it gets the CPU and run() executes.', 'Waiting: sleep(), wait() or join() pauses it; then it goes back to Runnable.', 'Terminated: run() finishes. It can never start again.'],
  exam: 'Draw the state diagram with arrows. Show the 2 ways to create a thread: extend Thread, or implement Runnable (preferred).',
  yaad: 'New → Runnable → Running → Waiting → Terminated.'
},
'u2-sync': {
  s: 'When two threads change the same data at the same time, mistakes happen. synchronized lets only one thread in at a time.',
  story: 'One train seat is left. Two people click "book" at the same second. Both see "1 seat free" and both get a ticket. That is a mess. Fix: a lock on the booking counter, so one person books, then the next.',
  words: [['Race condition', 'Wrong results when two threads change shared data together.'], ['synchronized', 'A keyword that puts a lock on a method.'], ['Lock', 'Only the thread holding it can enter.'], ['Priority', 'A number 1-10 that asks the scheduler to prefer a thread (not a guarantee).'], ['Deadlock', 'Two threads each waiting for the other forever.']],
  how: ['Mark the method <code>synchronized</code>.', 'The first thread takes the lock and enters.', 'Other threads wait outside (Blocked).', 'When it leaves, the next thread takes the lock.'],
  exam: 'Write the even/odd two-thread program and set priorities. Explain: priority 1 (MIN) to 10 (MAX), default 5, it is only a hint. Give advantages (safe data) and disadvantages (slower, deadlock risk) of synchronization.',
  yaad: 'synchronized = one lock, one thread at a time.'
},
'u2-lambda': {
  s: 'A lambda is a short, nameless function that replaces several lines of code with one line.',
  story: 'Before: to ask a friend for a favour you wrote a formal letter. Now you just send a short text: "sort this pls". The lambda is that short text.',
  words: [['Lambda', 'A tiny function written as (input) -> output.'], ['Functional interface', 'An interface with exactly ONE method to fill in.'], ['Predicate', 'Checks something and answers true or false.'], ['Function', 'Takes something and gives back something else.'], ['Method reference', 'An even shorter form, like System.out::println.']],
  how: ['Find an interface that has only one method (e.g. Comparator).', 'Instead of writing a whole class, write <code>(a, b) -> a - b</code>.', 'Java understands which method you are filling in.', 'Use it to sort, filter or print lists in one line.'],
  exam: 'Give the syntax (parameters) -> body, define functional interface with @FunctionalInterface, show one custom example and one list-sorting example.',
  yaad: 'Lambda = a short text instead of a long letter.'
},
'u2-stream': {
  s: 'A stream processes a list step by step (filter, change, sort, combine) without writing loops.',
  story: 'A mango factory belt: remove bad mangoes (filter), peel them (map), line them up by size (sort), pack them into a box (collect). The mangoes in the warehouse are not touched.',
  words: [['filter', 'Keep only items that pass a test.'], ['map', 'Change each item into something else.'], ['sorted', 'Put items in order.'], ['reduce', 'Combine all items into one value (e.g. a total).'], ['collect', 'Gather the results back into a list.']],
  how: ['Start with <code>list.stream()</code>.', 'Add steps like filter, map, sorted.', 'End with collect, reduce or forEach.', 'Nothing runs until the final step is called.'],
  exam: 'Draw the pipeline (source → intermediate steps → final step). Explain filter, map, sorted, reduce. Write the program that filters students above 75, sorts them and prints names.',
  yaad: 'Filter → Map → Sort → Reduce.'
},
'u2-jdbc': {
  s: 'JDBC lets a Java program talk to a database: connect, send a query, read the result, close.',
  story: 'You want to talk to a shopkeeper in Japan but don\'t speak Japanese, so you hire a translator. The receptionist (DriverManager) sends you the right translator (driver).',
  words: [['Database', 'An organised store of data in tables (e.g. MySQL).'], ['Driver', 'The translator between Java and one specific database.'], ['Connection', 'An open line between your program and the database.'], ['Query', 'A question or command in SQL, e.g. SELECT * FROM student.'], ['PreparedStatement', 'A safe, reusable query with ? placeholders.']],
  how: ['Load the driver.', 'Open a connection with DriverManager.getConnection().', 'Create a statement (preferably PreparedStatement).', 'Run the query: executeQuery() for reading, executeUpdate() for changes.', 'Close the connection.'],
  exam: 'Draw the architecture (App → JDBC API → DriverManager → Driver → Database), list the 4 driver types, write the 5 steps, and add a Statement vs PreparedStatement table (PreparedStatement prevents SQL injection).',
  yaad: 'Load → Connect → Statement → Execute → Close.'
},
'u2-io': {
  s: 'A stream is a pipe for data. Byte streams carry raw data (images, audio); character streams carry text.',
  story: 'One pipe carries sealed boxes (bytes: photos, videos). Another carries water you can drink (characters: readable text in any language).',
  words: [['Byte stream', 'Reads/writes raw 8-bit data. Classes end with "Stream".'], ['Character stream', 'Reads/writes text characters. Classes end with "Reader"/"Writer".'], ['FileReader', 'Reads text from a file.'], ['BufferedReader', 'Reads text faster; readLine() gets a full line.'], ['Autoboxing', 'Java automatically turns int into an Integer object.']],
  how: ['For text files, use FileReader/BufferedReader to read.', 'Use FileWriter to write text.', 'For images or objects, use FileInputStream/FileOutputStream.', 'Collections store objects, so Java auto-boxes int to Integer.'],
  exam: '2 marks: name FileReader (reads characters from a file) and BufferedReader (buffered, reads a line at a time with readLine()). Add a small byte vs character table.',
  yaad: 'Reader/Writer = text. Stream = bytes.'
},
'u2-serial': {
  s: 'Serialization turns an object into bytes so it can be saved in a file and loaded back later.',
  story: 'Moving house: you pack furniture into boxes (serialize), carry them, and unpack in the new house (deserialize). Rubbish you mark "do not pack" stays behind (transient).',
  words: [['Serializable', 'A label on the class that says "this object may be saved".'], ['writeObject()', 'Packs the object into the file.'], ['readObject()', 'Unpacks it back into an object.'], ['transient', 'Marks a field that must NOT be saved (e.g. a password).']],
  how: ['Add <code>implements Serializable</code> to the Employee class.', 'Keep all employees in a list.', 'On Add or Delete, save the whole list with writeObject().', 'On start or View, load it with readObject().'],
  exam: 'This was a compulsory 10-mark question last year. Write the Employee class, load() and save() methods, and the menu loop: 1 Add, 2 View, 3 Delete, 4 Exit.',
  yaad: 'writeObject = pack, readObject = unpack, transient = do not pack.'
},
'u3-ioc': {
  s: 'IoC (Inversion of Control) means Spring creates your objects and hands them to you, instead of you creating them.',
  story: 'At home you cook your own food. In a hostel mess you just sit down and food is served. Control moved from you to the mess. That is the "inversion".',
  words: [['Spring', 'A framework (ready-made toolkit) for building Java apps.'], ['Container', 'The part of Spring that creates and manages objects.'], ['Bean', 'An object that Spring creates and manages.'], ['Dependency', 'Something an object needs to work (a Car needs an Engine).'], ['Dependency Injection (DI)', 'Spring giving the object what it needs.']],
  how: ['You mark classes so Spring knows about them.', 'Spring creates the objects (beans).', 'Spring passes each object what it needs: through the constructor, a setter, or directly into a field (@Autowired).', 'Your class never writes <code>new</code> for its dependencies.'],
  exam: '2 marks: IoC = control of object creation given to the Spring IoC container. 10 marks: IoC + DI + the 3 injection types with code + a comparison table + benefits (loose coupling, easy testing).',
  yaad: 'IoC = hostel mess. You ask, Spring serves.'
},
'u3-annot': {
  s: 'Annotations are labels starting with @ that tell Spring what each class does.',
  story: 'Office ID cards say "Manager", "Accountant", "Security". Everyone is an employee, but the card tells you their role.',
  words: [['@Component', 'A general "Spring, please manage this class" label.'], ['@Service', 'Same, for business logic classes.'], ['@Repository', 'Same, for database classes.'], ['@Autowired', '"Please give me an object of this type."'], ['@Bean', 'Placed on a method; the object it returns is managed by Spring.']],
  how: ['Put @Component, @Service or @Repository on a class.', 'Spring scans and creates those objects.', 'Wherever you write @Autowired, Spring plugs in the right object.', 'Use @Configuration + @Bean for objects you create yourself.'],
  exam: 'One or two lines for each annotation with a tiny example. Note: @Component goes on a class, @Bean goes on a method.',
  yaad: 'Component = employee, Service = logic, Repository = database, Autowired = give me.'
},
'u3-jpa': {
  s: 'JPA/Hibernate turns Java classes into database tables automatically. Relationships tell it how tables connect.',
  story: 'A college register: one list of students, one list of departments. Each student row has a department number. That number links the two lists.',
  words: [['Table', 'Rows and columns of data in a database.'], ['@Entity', 'Says "this class is a table".'], ['@Id', 'Marks the primary key (the unique ID of each row).'], ['Foreign key', 'A column that points to a row in another table.'], ['Join table', 'An extra table that links two tables in a many-to-many relationship.']],
  how: ['Put @Entity and @Table on a class.', 'Mark the ID field with @Id and @GeneratedValue.', 'Add relationship labels: @OneToOne, @OneToMany/@ManyToOne, @ManyToMany.', 'Hibernate creates the tables and SQL for you.'],
  exam: '2 marks: purpose of @Entity (class = table) and @Table (table name). 10 marks: all four relationships with code, and draw the tables showing foreign keys.',
  yaad: 'Class = table, object = row. The foreign key sits on the "many" side.'
},
'u3-rest': {
  s: 'A REST API lets programs ask a server for data or change it, using a web address and an action word (GET, POST, PUT, DELETE).',
  story: 'Ordering food in an app: "show menu" (GET), "place order" (POST), "change address" (PUT), "cancel order" (DELETE). The restaurant replies "done" or "not found".',
  words: [['URL', 'The web address of the thing, e.g. /students/1.'], ['GET/POST/PUT/DELETE', 'Read / create / update / delete.'], ['JSON', 'A simple text format for data: {"name": "Asha"}.'], ['Status code', 'A number in the reply: 200 OK, 201 Created, 404 Not Found.'], ['@RestController', 'A class whose methods answer web requests with JSON.']],
  how: ['Create a class with @RestController.', 'Add methods with @GetMapping, @PostMapping, @PutMapping, @DeleteMapping.', 'Read the id from the URL with @PathVariable.', 'Read the sent JSON with @RequestBody.', 'Return data; Spring turns it into JSON.'],
  exam: 'Write the full StudentController with the 5 methods, plus a table: method → URL → annotation → status code.',
  yaad: 'GET read, POST create, PUT update, DELETE remove.'
},
'u3-patterns': {
  s: 'Design patterns are proven solutions to common coding problems. Singleton = only one object; Factory = something that makes objects for you.',
  story: 'Singleton: a school has only one principal. Factory: at a pizza counter you say "veg pizza" and the kitchen makes it; you never enter the kitchen.',
  words: [['Singleton', 'A class that allows only one object.'], ['Factory', 'A method that creates the right object based on what you ask.'], ['Observer', 'Subscribers are notified automatically when something changes.'], ['Strategy', 'Swap between different ways of doing a task at runtime.'], ['Creational vs Behavioral', 'Patterns about making objects vs patterns about how objects talk.']],
  how: ['Singleton: private constructor, one static object, getInstance() returns it.', 'Factory: getShape("circle") returns a new Circle.', 'Observer: a list of subscribers; notify all on change.', 'Strategy: choose the algorithm object at runtime.'],
  exam: 'Code for Singleton and Factory, a small diagram, and a Creational vs Behavioral table.',
  yaad: 'Singleton = one principal. Factory = pizza kitchen.'
},
'u3-servlet': {
  s: 'A servlet is a Java program on a web server that receives a form from the browser and sends back a web page.',
  story: 'A post office counter: you hand in a filled form (request) and get a receipt (response). The counter opens once in the morning, serves people all day, and closes once at night.',
  words: [['Web server (Tomcat)', 'The program that runs servlets and talks to browsers.'], ['Request', 'What the browser sends (form data).'], ['Response', 'What the server sends back (an HTML page).'], ['getParameter()', 'Reads one form field, e.g. the name.'], ['init / service / destroy', 'Start once / handle every request / stop once.']],
  how: ['The server loads the servlet and calls init() once.', 'For every request, service() runs (doGet or doPost).', 'The servlet reads input with request.getParameter().', 'It writes the reply with response.getWriter().', 'When the server stops, destroy() runs once.'],
  exam: '2 marks: HttpServletRequest reads form input (getParameter). 5 marks: explain the lifecycle and write the WelcomeServlet with an HTML form.',
  yaad: 'init once, service every time, destroy once.'
},
'u3-layered': {
  s: 'A Spring app is split into layers: Controller takes the request, Service does the thinking, Repository talks to the database.',
  story: 'A restaurant: the waiter takes your order, the chef cooks, the storekeeper brings ingredients from the store room. Each does one job.',
  words: [['Controller', 'Receives the web request and sends the reply (@RestController).'], ['Service', 'Holds the business logic (@Service).'], ['Repository / DAO', 'Reads and writes the database (@Repository).'], ['Hibernate', 'Translates Java objects to SQL and back.'], ['application.properties', 'A settings file with the database address and password.']],
  how: ['A request arrives at the Controller.', 'The Controller calls the Service.', 'The Service calls the Repository.', 'The Repository uses Hibernate to run SQL on the database.', 'The answer travels back up as JSON.'],
  exam: 'Draw the layer diagram (Client → Controller → Service → Repository → Hibernate → DB) and show a short code piece for each layer plus application.properties.',
  yaad: 'Waiter → Chef → Storekeeper → Store room.'
},
'u3-jsp': {
  s: 'JSP is an HTML page with small bits of Java. With a servlet and JDBC, you can save form data into a database.',
  story: 'A printed form with blanks to fill. The teacher fills attendance; the office (servlet) writes it into the register (database) and hands back a "saved" slip.',
  words: [['JSP', 'Java Server Page: HTML plus small Java pieces.'], ['Directive <%@ %>', 'Page settings, imports and includes.'], ['Scriptlet <% %>', 'A block of Java code.'], ['Expression <%= %>', 'Prints a value on the page.'], ['EL ${ }', 'Shows data on the page without writing Java.']],
  how: ['attendance.jsp shows a form.', 'The form is sent to AttendanceServlet.', 'The servlet reads the fields with getParameter().', 'It saves them with a JDBC INSERT.', 'It forwards to success.jsp, which shows a message.'],
  exam: 'Q11: flow diagram, attendance.jsp, AttendanceServlet and the SQL table. Q12: syntax of each JSP component and how includes and EL make pages reusable.',
  yaad: 'JSP shows, Servlet does, JDBC saves.'
},
'u3-bank': {
  s: 'Transferring money has two steps (take from A, give to B). @Transactional makes sure both happen or neither does.',
  story: 'You send ₹500 by UPI. It leaves your account, then the server crashes before your friend gets it. Where did the money go? A transaction prevents this: if anything fails, everything is undone.',
  words: [['Transaction', 'A group of steps that succeed together or fail together.'], ['Commit', 'Save all the changes permanently.'], ['Rollback', 'Undo all the changes.'], ['@Transactional', 'The Spring label that wraps a method in a transaction.'], ['@ControllerAdvice', 'One place that catches errors for all controllers and sends a clean message.']],
  how: ['Put @Transactional on the transfer() method.', 'Spring starts a transaction.', 'Take money from A, add it to B.', 'All good → commit. An exception → rollback, and nothing changes.', 'If the balance is too low, throw InsufficientFundsException; @ControllerAdvice returns a clean JSON error.'],
  exam: 'Explain ACID, write the layered code (Entity, Repository, Service with @Transactional, Controller, ControllerAdvice), and draw the flow: success → commit, failure → rollback.',
  yaad: 'Both steps or none. Failure = rollback.'
}
};
