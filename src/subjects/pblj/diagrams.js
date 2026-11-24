// Rendered diagrams per topic (see components/Diagram.jsx for the block types).
export default {
  'u1-jvm': [
    { h: 'JDK ⊃ JRE ⊃ JVM' },
    { t: 'JDK · Java Development Kit', s: 'javac · javadoc · jar · jdb (development tools)', tone: 'u1', kids: [
      { t: 'JRE · Java Runtime Environment', s: 'core libraries: java.lang · java.util · java.io', tone: 'u2', kids: [
        { t: 'JVM · Java Virtual Machine', s: 'Class Loader → Memory Areas → Execution Engine', tone: 'a' }] }] },
    { h: 'Compile once, run anywhere' },
    { flow: [{ t: 'Hello.java', s: 'source code' }, { t: 'Hello.class', s: 'BYTECODE', tone: 'a' }, { t: 'JVM', s: 'interpreter + JIT' }, { t: 'Machine code', s: 'native to this OS' }], labels: ['javac', 'java', 'executes'] },
    { grid: [{ t: 'Windows JVM', tone: 'u1' }, { t: 'Linux JVM', tone: 'u2' }, { t: 'macOS JVM', tone: 'u3' }] },
    { note: 'The same .class file runs on every JVM → platform independence (WORA)' },
    { h: 'JVM architecture' },
    { flow: [
      { t: 'Class Loader Subsystem', s: 'Loading → Linking (verify · prepare · resolve) → Initialization', tone: 'u1' },
      { t: 'Runtime Data Areas', tone: 'u2', kids: [{ t: 'Method Area', s: 'shared' }, { t: 'Heap', s: 'shared · objects' }, { t: 'Java Stack', s: 'per thread' }, { t: 'PC Register', s: 'per thread' }, { t: 'Native Stack', s: 'per thread' }] },
      { t: 'Execution Engine', tone: 'a', kids: [{ t: 'Interpreter' }, { t: 'JIT Compiler' }, { t: 'Garbage Collector' }] },
      { t: 'Native Method Libraries', s: 'C/C++ code, called through JNI', tone: 'dim' }
    ], col: true, labels: ['', '', 'JNI'] }
  ],

  'u1-oop': [
    { tree: { t: 'OOP in Java', tone: 'a', kids: [
      { t: 'Encapsulation', s: 'private data + getters/setters', tone: 'u1' },
      { t: 'Abstraction', s: 'abstract class · interface', tone: 'u2' },
      { t: 'Inheritance', s: 'extends · IS-A · super', tone: 'u3' },
      { t: 'Polymorphism', s: 'overloading · overriding', tone: 'warn' }] } },
    { h: 'One example shows all four' },
    { tree: { t: 'abstract class Employee', s: 'private name (encapsulation) · abstract calculateSalary() (abstraction)', tone: 'a', kids: [
      { t: 'FullTimeEmployee', s: 'extends Employee · calculateSalary() = monthly' },
      { t: 'PartTimeEmployee', s: 'extends Employee · calculateSalary() = hours × rate' }] } },
    { note: 'Employee e = new PartTimeEmployee(); e.calculateSalary() → runtime polymorphism' }
  ],

  'u1-inherit': [
    { grid: [
      { cap: 'Single', tree: { t: 'A', tone: 'u1', kids: [{ t: 'B' }] } },
      { cap: 'Multilevel', tree: { t: 'A', tone: 'u1', kids: [{ t: 'B', kids: [{ t: 'C' }] }] } },
      { cap: 'Hierarchical', tree: { t: 'A', tone: 'u1', kids: [{ t: 'B' }, { t: 'C' }] } }
    ] },
    { grid: [
      { cap: 'Multiple with classes ✗ (diamond problem)', merge: { from: [{ t: 'B', s: 'show()', tone: 'bad' }, { t: 'C', s: 'show()', tone: 'bad' }], to: { t: 'D extends B, C', s: 'd.show() → which one? ambiguous', tone: 'bad' }, label: 'compile error', bad: true } },
      { cap: 'Multiple with interfaces ✓', merge: { from: [{ t: '«interface» A', tone: 'u2' }, { t: '«interface» B', tone: 'u2' }], to: { t: 'C implements A, B', s: 'C writes the method body', tone: 'ok' }, label: 'implements' } }
    ] }
  ],

  'u1-overload': [
    { grid: [
      { cap: 'Overloading · compiler decides (compile time)', t: 'class Calculator', tone: 'u1', col: true, kids: [
        { t: 'add(int a, int b)', s: '← add(2, 3)' },
        { t: 'add(int a, int b, int c)', s: '← add(2, 3, 4)' },
        { t: 'add(double a, double b)', s: '← add(2.5, 3.5)' }] },
      { cap: 'Overriding · JVM decides (runtime)', tree: { t: 'Animal', s: 'sound() → "..."', tone: 'u3', kids: [{ t: 'Dog', s: 'sound() → "Bark"', tone: 'a' }, { t: 'Cat', s: 'sound() → "Meow"' }] } }
    ] },
    { note: 'Animal a = new Dog();  a.sound();  → "Bark"  (actual object decides)' }
  ],

  'u1-access': [
    { t: 'public', s: 'everywhere', tone: 'ok', kids: [
      { t: 'protected', s: 'same package + subclasses in other packages', tone: 'u2', kids: [
        { t: 'default (no keyword)', s: 'same package only', tone: 'u1', kids: [
          { t: 'private', s: 'same class only', tone: 'a' }] }] }] },
    { note: 'Each inner ring is more restrictive than the one around it' }
  ],

  'u1-exception': [
    { tree: { t: 'Throwable', tone: 'a', kids: [
      { t: 'Error', s: 'serious, cannot recover', tone: 'bad', kids: [{ t: 'OutOfMemoryError' }, { t: 'StackOverflowError' }] },
      { t: 'Exception', tone: 'u1', kids: [
        { t: 'Checked', s: 'compile time · must handle', tone: 'warn', kids: [{ t: 'IOException' }, { t: 'SQLException' }] },
        { t: 'RuntimeException', s: 'unchecked · at runtime', tone: 'u3', kids: [{ t: 'ArithmeticException' }, { t: 'NullPointerException' }] }] }] } },
    { h: 'Flow of control' },
    { flow: [{ t: 'try', s: 'risky code' }, { t: 'catch', s: 'matching type handles it', tone: 'bad' }, { t: 'finally', s: 'ALWAYS runs', tone: 'ok' }, { t: 'rest of program', s: 'continues normally' }], labels: ['exception', '', ''] },
    { note: 'No exception → catch is skipped, but finally still runs' }
  ],

  'u1-custom': [
    { flow: [
      { t: 'class AgeException extends Exception', s: 'constructor → super(message)', tone: 'u1' },
      { t: 'register(age) throws AgeException', s: 'if (age < 18) throw new AgeException(...)', tone: 'a' },
      { t: 'caller: try { register(15); }', s: 'call the risky method' },
      { t: 'catch (AgeException e)', s: 'print e.getMessage()', tone: 'bad' },
      { t: 'finally', s: '"Process finished"', tone: 'ok' }
    ], col: true, labels: ['used in', 'called by', 'thrown to', 'then'] }
  ],

  'u2-collections': [
    { tree: { t: 'Collection «interface»', s: 'extends Iterable', tone: 'a', kids: [
      { t: 'List', s: 'ordered · duplicates ✓', tone: 'u1', kids: [{ t: 'ArrayList' }, { t: 'LinkedList' }, { t: 'Vector', kids: [{ t: 'Stack' }] }] },
      { t: 'Set', s: 'unique only', tone: 'u2', kids: [{ t: 'HashSet', kids: [{ t: 'LinkedHashSet' }] }, { t: 'TreeSet', s: 'sorted' }] },
      { t: 'Queue', s: 'FIFO', tone: 'u3', kids: [{ t: 'PriorityQueue' }, { t: 'ArrayDeque' }] }] } },
    { h: 'Separate hierarchy · key → value' },
    { tree: { t: 'Map «interface»', s: 'NOT a child of Collection', tone: 'warn', kids: [{ t: 'HashMap', kids: [{ t: 'LinkedHashMap' }] }, { t: 'TreeMap', s: 'sorted keys' }, { t: 'Hashtable', s: 'legacy, synchronized' }] } }
  ],

  'u2-al-ll': [
    { h: 'ArrayList · dynamic array' },
    { cells: ['A', 'B', 'C', 'D', 'E'], idx: true, hl: true, note2: 'Contiguous memory · get(3) jumps straight to index 3 → O(1) · insert in middle shifts elements → O(n)' },
    { h: 'LinkedList · doubly linked nodes' },
    { chain: ['A', 'B', 'C', 'D', 'E'] },
    { note: 'Each node = prev | data | next · get(3) walks node by node → O(n) · insert = change 2 links → O(1)' }
  ],

  'u2-hm-tm': [
    { grid: [
      { cap: 'HashMap · hash table', t: 'put → hashCode() → bucket index', tone: 'u1', kids: [{ t: 'Mango=40' }, { t: 'Apple=120' }, { t: 'Banana=30' }], s: 'no order · O(1) · 1 null key OK' },
      { cap: 'TreeMap · Red-Black tree', tree: { t: 'Banana=30', tone: 'u2', kids: [{ t: 'Apple=120' }, { t: 'Mango=40' }] } }
    ] },
    { note: 'TreeMap keeps keys sorted (Apple < Banana < Mango) · O(log n) · null key ✗' }
  ],

  'u2-thread-life': [
    { flow: [{ t: 'NEW', s: 'new Thread()', tone: 'dim' }, { t: 'RUNNABLE', s: 'ready, waiting for CPU', tone: 'u1' }, { t: 'RUNNING', s: 'run() executing', tone: 'a' }, { t: 'TERMINATED', s: 'dead · can\'t restart', tone: 'bad' }], labels: ['start()', 'scheduler picks', 'run() ends'] },
    { branch: { down: 'sleep() · wait() · join() · lock busy', up: 'time over · notify() · lock free → RUNNABLE', node: { t: 'BLOCKED / WAITING / TIMED_WAITING', s: 'temporarily not runnable', tone: 'warn' } } },
    { h: 'Two ways to create a thread' },
    { grid: [
      { t: 'class T extends Thread', s: 'override run() · new T().start()', tone: 'u2' },
      { t: 'class R implements Runnable', s: 'new Thread(new R()).start() · preferred', tone: 'ok' }
    ] }
  ],

  'u2-sync': [
    { merge: { from: [{ t: 'Thread A (VIP)', s: 'gets the lock 🔒', tone: 'ok' }, { t: 'Thread B', s: 'BLOCKED, waits for lock', tone: 'warn' }], to: { t: 'synchronized void book()', s: 'object monitor lock → only one thread inside at a time', tone: 'a' }, label: 'both call book()' } },
    { h: 'Thread priority (a hint, not a guarantee)' },
    { cells: ['1 · MIN_PRIORITY', '5 · NORM_PRIORITY (default)', '10 · MAX_PRIORITY'], hl: true },
    { h: 'Even / odd program' },
    { grid: [{ t: 'EvenThread', s: 'prints 2, 4 … 20 · setPriority(10)', tone: 'u1' }, { t: 'OddThread', s: 'prints 1, 3 … 19 · setPriority(1)', tone: 'u2' }] }
  ],

  'u2-lambda': [
    { flow: [{ t: 'Anonymous class', s: 'new Comparator<>() { public int compare(a, b) { … } }', tone: 'dim' }, { t: 'Lambda', s: '(a, b) -> a.marks - b.marks', tone: 'a' }, { t: 'Method reference', s: 'Comparator.comparingInt(Student::getMarks)', tone: 'ok' }], labels: ['shorten', 'shorter'] },
    { h: 'Built-in functional interfaces (one abstract method each)' },
    { grid: [{ t: 'Predicate<T>', s: 'boolean test(T)', tone: 'u1' }, { t: 'Function<T,R>', s: 'R apply(T)', tone: 'u2' }, { t: 'Consumer<T>', s: 'void accept(T)', tone: 'u3' }, { t: 'Supplier<T>', s: 'T get()', tone: 'warn' }] }
  ],

  'u2-stream': [
    { flow: [{ t: 'Source', s: 'list.stream()', tone: 'dim' }, { t: 'filter', s: 'keep x > 75', tone: 'u1' }, { t: 'map', s: 'x → x * 2', tone: 'u2' }, { t: 'sorted', s: 'ascending', tone: 'u3' }, { t: 'reduce / collect', s: 'terminal → result', tone: 'a' }], labels: ['', '', '', ''] },
    { note: 'filter · map · sorted are lazy intermediate operations · nothing runs until the terminal one' },
    { h: 'Worked example' },
    { cells: ['45', '80', '92', '70', '88'], note2: 'source' },
    { cells: ['80', '92', '88'], note2: 'filter(x > 75)' },
    { cells: ['160', '184', '176'], note2: 'map(x * 2)' },
    { cells: ['160', '176', '184'], note2: 'sorted()' },
    { cells: ['520'], hl: true, note2: 'reduce(0, (a, b) -> a + b)' }
  ],

  'u2-jdbc': [
    { flow: [
      { t: 'Java Application', s: 'your code', tone: 'u1' },
      { t: 'JDBC API', s: 'Connection · Statement · PreparedStatement · ResultSet', tone: 'u2' },
      { t: 'DriverManager', s: 'chooses the driver for the URL', tone: 'u3' },
      { t: 'JDBC Driver', s: 'e.g. MySQL Connector/J (Type 4)', tone: 'a' },
      { t: 'Database', s: 'MySQL / Oracle', tone: 'ok' }
    ], col: true, labels: ['calls', '', '', 'DB protocol'] },
    { h: '5 steps to connect' },
    { flow: [{ t: '1 Load driver', s: 'Class.forName()' }, { t: '2 Connect', s: 'getConnection()' }, { t: '3 Statement', s: 'prepareStatement()' }, { t: '4 Execute', s: 'executeQuery / Update' }, { t: '5 Close', s: 'con.close()' }], labels: ['', '', '', ''] },
    { h: '4 driver types' },
    { grid: [{ t: 'Type 1', s: 'JDBC-ODBC bridge', tone: 'dim' }, { t: 'Type 2', s: 'Native-API', tone: 'dim' }, { t: 'Type 3', s: 'Network protocol', tone: 'dim' }, { t: 'Type 4', s: 'Thin, pure Java ✓', tone: 'ok' }] }
  ],

  'u2-io': [
    { tree: { t: 'java.io streams', tone: 'a', kids: [
      { t: 'Byte streams', s: '8-bit · binary data', tone: 'u1', kids: [{ t: 'InputStream', kids: [{ t: 'FileInputStream' }, { t: 'ObjectInputStream' }] }, { t: 'OutputStream', kids: [{ t: 'FileOutputStream' }, { t: 'ObjectOutputStream' }] }] },
      { t: 'Character streams', s: '16-bit Unicode · text', tone: 'u2', kids: [{ t: 'Reader', kids: [{ t: 'FileReader' }, { t: 'BufferedReader' }] }, { t: 'Writer', kids: [{ t: 'FileWriter' }, { t: 'PrintWriter' }] }] }] } },
    { h: 'Autoboxing / unboxing' },
    { flow: [{ t: 'int 10', s: 'primitive', tone: 'u1' }, { t: 'Integer 10', s: 'wrapper object', tone: 'u2' }], labels: ['autoboxing ⇄ unboxing'], both: true }
  ],

  'u2-serial': [
    { flow: [{ t: 'Employee objects', s: 'ArrayList<Employee> in memory', tone: 'u1' }, { t: 'byte stream', s: 'AC ED 00 05 …', tone: 'warn' }, { t: 'employees.dat', s: 'file on disk', tone: 'ok' }], labels: ['writeObject() · serialize', 'FileOutputStream'] },
    { flow: [{ t: 'employees.dat', s: 'file on disk', tone: 'ok' }, { t: 'byte stream', tone: 'warn' }, { t: 'Employee objects', s: 'transient fields → null', tone: 'u1' }], labels: ['FileInputStream', 'readObject() · deserialize'] },
    { h: 'Menu application' },
    { flow: [{ t: 'Start', s: 'list = load() from file', tone: 'dim' }, { t: 'Menu loop', s: 'Scanner reads choice', tone: 'a' }], labels: [''] },
    { grid: [{ t: '1 · Add', s: 'list.add(e) → save(list)', tone: 'u1' }, { t: '2 · View', s: 'print every Employee', tone: 'u2' }, { t: '3 · Delete', s: 'removeIf(id) → save(list)', tone: 'u3' }, { t: '4 · Exit', s: 'break / return', tone: 'dim' }] }
  ],

  'u3-ioc': [
    { grid: [
      { cap: 'Without IoC · tight coupling', t: 'class Car', s: 'creates its own engine with new', tone: 'bad', kids: [{ t: 'new PetrolEngine()', s: 'hard-coded · change = edit Car' }] },
      { cap: 'With IoC · loose coupling', t: 'Spring IoC Container (ApplicationContext)', s: 'creates beans and injects them', tone: 'ok', kids: [{ t: 'Engine bean' }, { t: 'Car bean', s: 'Engine injected via constructor' }] }
    ] },
    { h: 'Types of dependency injection' },
    { grid: [{ t: 'Constructor', s: 'mandatory deps · final · recommended', tone: 'ok' }, { t: 'Setter', s: 'optional deps · can change', tone: 'u1' }, { t: 'Field', s: '@Autowired on field · hard to test', tone: 'warn' }] },
    { h: 'Bean lifecycle' },
    { flow: [{ t: 'Instantiate' }, { t: 'Inject dependencies' }, { t: '@PostConstruct', s: 'init' }, { t: 'Ready to use', tone: 'ok' }, { t: '@PreDestroy', s: 'on shutdown', tone: 'bad' }], labels: ['', '', '', ''] }
  ],

  'u3-annot': [
    { tree: { t: '@Component', s: 'generic Spring bean', tone: 'a', kids: [
      { t: '@Service', s: 'business logic', tone: 'u1' },
      { t: '@Repository', s: 'DAO + DB exception translation', tone: 'u2' },
      { t: '@Controller', s: 'web layer', tone: 'u3', kids: [{ t: '@RestController', s: '+ @ResponseBody → JSON' }] }] } },
    { flow: [{ t: '@Configuration class', tone: 'u1' }, { t: '@Bean methods', s: 'return objects', tone: 'u2' }, { t: 'IoC container', s: 'holds the beans', tone: 'a' }, { t: '@Autowired field', s: 'gets the bean by type', tone: 'ok' }], labels: ['contains', 'registered in', 'injected into'] }
  ],

  'u3-jpa': [
    { h: '@OneToOne · Person ↔ Passport' },
    { flow: [{ table: { name: 'person', cols: ['id*', 'name', 'passport_id>'], c: '#6d9cff' } }, { table: { name: 'passport', cols: ['id*', 'number'], c: '#3fcf98' } }], labels: ['1 : 1'], both: true },
    { h: '@OneToMany / @ManyToOne · Department → Employees' },
    { flow: [{ table: { name: 'department', cols: ['id*', 'name'], c: '#3fcf98' } }, { table: { name: 'employee', cols: ['id*', 'name', 'dept_id>'], c: '#6d9cff' } }], labels: ['1 : N'], both: true },
    { note: 'FK lives on the MANY side (@ManyToOne + @JoinColumn) · Department uses mappedBy' },
    { h: '@ManyToMany · Student ↔ Course' },
    { flow: [{ table: { name: 'student', cols: ['id*', 'name'], c: '#6d9cff' } }, { table: { name: 'student_course', cols: ['student_id>', 'course_id>'], c: '#ff7a3d' } }, { table: { name: 'course', cols: ['id*', 'title'], c: '#b48cff' } }], labels: ['N', 'N'], both: true },
    { note: 'Join table holds pairs of foreign keys (@JoinTable)' }
  ],

  'u3-rest': [
    { flow: [{ t: 'Client', s: 'Postman · browser · RestTemplate', tone: 'dim' }, { t: '@RestController', s: 'StudentController · @RequestMapping("/students")', tone: 'a' }, { t: 'Service / List / DB', s: 'data', tone: 'u2' }], labels: ['HTTP request + JSON', 'calls'], both: true },
    { note: 'Jackson converts Java objects ⇄ JSON automatically' },
    { h: 'CRUD ↔ HTTP' },
    { grid: [
      { t: 'GET /students', s: '@GetMapping · 200 OK', tone: 'u2' },
      { t: 'GET /students/{id}', s: '@PathVariable · 200 / 404', tone: 'u2' },
      { t: 'POST /students', s: '@RequestBody · 201 Created', tone: 'u1' },
      { t: 'PUT /students/{id}', s: '@PutMapping · 200 OK', tone: 'warn' },
      { t: 'DELETE /students/{id}', s: '@DeleteMapping · 204', tone: 'bad' }] }
  ],

  'u3-patterns': [
    { grid: [
      { cap: 'Singleton · creational', t: 'DBConnection', s: '− static instance · − private constructor · + getInstance()', tone: 'a', kids: [{ t: 'every call → SAME object' }] },
      { cap: 'Factory · creational', tree: { t: 'ShapeFactory.getShape(type)', tone: 'u1', kids: [{ t: 'Circle' }, { t: 'Square' }, { t: 'Triangle' }] } },
      { cap: 'Observer · behavioral', tree: { t: 'ProductService (subject)', s: 'addProduct() → notify all', tone: 'u2', kids: [{ t: 'Inventory' }, { t: 'Email' }] } },
      { cap: 'Strategy · behavioral', tree: { t: '«InsuranceStrategy»', s: 'chosen at runtime', tone: 'u3', kids: [{ t: 'Car' }, { t: 'Bike' }, { t: 'Truck' }] } }
    ] }
  ],

  'u3-servlet': [
    { flow: [{ t: 'Browser form', s: 'studentName = "Asha"', tone: 'dim' }, { t: 'Web container (Tomcat)', s: 'creates request/response objects', tone: 'u1' }, { t: 'WelcomeServlet', s: 'doPost(req, res)', tone: 'a' }], labels: ['HTTP POST', 'calls'] },
    { grid: [{ t: 'HttpServletRequest', s: 'INPUT · getParameter("studentName")', tone: 'u2' }, { t: 'HttpServletResponse', s: 'OUTPUT · setContentType · getWriter()', tone: 'u3' }] },
    { h: 'Servlet lifecycle' },
    { flow: [{ t: 'Load & instantiate', s: 'one object', tone: 'dim' }, { t: 'init()', s: 'ONCE', tone: 'ok' }, { t: 'service()', s: 'EVERY request', tone: 'a', kids: [{ t: 'doGet()' }, { t: 'doPost()' }] }, { t: 'destroy()', s: 'ONCE at shutdown', tone: 'bad' }], labels: ['', '', ''] }
  ],

  'u3-layered': [
    { flow: [
      { t: 'Client', s: 'Postman / browser · HTTP + JSON', tone: 'dim' },
      { t: 'Controller · @RestController', s: 'request/response, URL mapping', tone: 'u1' },
      { t: 'Service · @Service', s: 'business logic · @Transactional', tone: 'u2' },
      { t: 'DAO / Repository · @Repository', s: 'extends JpaRepository<Product, Long>', tone: 'u3' },
      { t: 'Hibernate (JPA provider)', s: '@Entity ⇄ SQL (ORM)', tone: 'a' },
      { t: 'Database · MySQL', s: 'tables', tone: 'ok' }
    ], col: true, both: true, labels: ['', 'DI', 'DI', '', 'JDBC'] },
    { note: 'Spring = glue (IoC/DI, auto-config from application.properties) · Hibernate = ORM' }
  ],

  'u3-jsp': [
    { flow: [{ t: 'attendance.jsp', s: 'View · HTML form', tone: 'u1' }, { t: 'AttendanceServlet', s: 'Controller · doPost()', tone: 'a' }, { t: 'MySQL', s: 'attendance table', tone: 'ok' }], labels: ['POST form data', 'JDBC INSERT'] },
    { flow: [{ t: 'AttendanceServlet', s: 'setAttribute("msg")', tone: 'a' }, { t: 'success.jsp', s: 'View · shows ${msg} (EL)', tone: 'u1' }], labels: ['forward()'] },
    { h: 'JSP lifecycle' },
    { flow: [{ t: '.jsp' }, { t: '.java servlet' }, { t: '.class' }, { t: 'jspInit()', tone: 'ok' }, { t: '_jspService()', s: 'every request', tone: 'a' }, { t: 'jspDestroy()', tone: 'bad' }], labels: ['translate', 'compile', 'load', '', ''] },
    { h: 'JSP components' },
    { grid: [{ t: 'Directive', s: '<%@ page | include | taglib %>', tone: 'u1' }, { t: 'Declaration', s: '<%! int x; %>', tone: 'u2' }, { t: 'Scriptlet', s: '<% java code %>', tone: 'u3' }, { t: 'Expression', s: '<%= value %>', tone: 'warn' }, { t: 'Include action', s: '<jsp:include page="" />', tone: 'a' }, { t: 'Expression Language', s: '${param.name}', tone: 'ok' }] }
  ],

  'u3-bank': [
    { flow: [
      { t: 'POST /api/bank/transfer', s: 'from=1 · to=2 · amount=500', tone: 'dim' },
      { t: 'BankController', s: '@RestController', tone: 'u1' },
      { t: 'BankService.transfer()', s: '@Transactional → BEGIN TRANSACTION', tone: 'a' }
    ], col: true, labels: ['', 'calls'] },
    { grid: [
      { cap: 'Success', t: 'debit A → credit B', s: 'both saved together', tone: 'ok', kids: [{ t: 'COMMIT' }] },
      { cap: 'Failure', t: 'InsufficientFundsException / crash', s: 'RuntimeException thrown', tone: 'bad', kids: [{ t: 'ROLLBACK', s: 'nothing saved' }, { t: '@ControllerAdvice', s: '→ 400 JSON error' }] }
    ] },
    { h: 'Entities' },
    { flow: [{ table: { name: 'customer', cols: ['id*', 'name'], c: '#3fcf98' } }, { table: { name: 'account', cols: ['id*', 'balance', 'customer_id>'], c: '#6d9cff' } }], labels: ['1 : N'], both: true },
    { note: 'Customer @OneToMany(mappedBy) · Account @ManyToOne @JoinColumn' }
  ]
};
