// Unit 3 · Spring, REST & Web. JSP EL is written as #{...} inside String.raw code and converted to ${...} on render.
const topics = [
{
  id: 'u3-ioc', unit: 3, title: 'IoC & Dependency Injection in Spring', marks: '2 / 10', mins: 18, pyq: 'Q5 · 2M', imp: true,
  q: 'Explain IoC and Dependency Injection in Spring. Describe constructor, setter and field injection. <i>(Last year, 2M: Define Inversion of Control in Spring.)</i>',
  simple: `<p>Normally you <b>cook your own food</b>: your class creates its own objects with <code>new</code>. With IoC you go to a <b>restaurant</b>: you just say what you need and the kitchen (Spring container) prepares and serves it. You no longer control creation, so control is <b>inverted</b>.</p><p><b>DI</b> is <i>how</i> the dish reaches you: at the table on arrival (constructor), brought later (setter), or put straight in your plate (field).</p>`,
  learn: [
    { title: 'The problem', body: `<p><code>class Car { Engine e = new PetrolEngine(); }</code></p><p>Car is <b>tightly coupled</b>: to switch engines you must edit Car. Testing with a fake engine is hard.</p>` },
    { title: 'IoC', body: `<p><b>Inversion of Control</b>: the responsibility of creating objects and managing their lifecycle moves from your code to the <b>Spring IoC container</b> (<code>ApplicationContext</code> / <code>BeanFactory</code>). Objects it manages are called <b>beans</b>.</p>` },
    { title: 'DI', body: `<p><b>Dependency Injection</b> is how IoC is implemented: the container <b>supplies (injects)</b> the dependencies a bean needs, instead of the bean creating them.</p>` },
    { title: '3 types', body: `<p><b>Constructor</b>: via constructor; mandatory deps, can be <code>final</code>. Recommended.<br><b>Setter</b>: via setter method; optional deps.<br><b>Field</b>: <code>@Autowired</code> on the field; shortest but hard to test.</p>` },
    { title: 'Bean lifecycle', body: `<p>Instantiate → inject dependencies → <code>@PostConstruct</code> (init) → <b>ready to use</b> → container shutdown → <code>@PreDestroy</code> (destroy).</p>` }
  ],
  widget: 'IocDemo',
  short: `<p><b>Inversion of Control (IoC)</b> is a design principle in which the control of creating objects, wiring their dependencies and managing their lifecycle is transferred from the program to the <b>Spring IoC container</b> (ApplicationContext). Instead of a class creating its dependencies with <code>new</code>, the container creates the beans and supplies them. This is done using <b>Dependency Injection</b> (constructor, setter or field), giving <b>loose coupling</b> and easier testing.</p>`,
  answer: `<h3>Inversion of Control (IoC)</h3><p>IoC is a principle where the <b>control of object creation and lifecycle is inverted</b>: it is given to a framework/container instead of the programmer. In Spring, the <b>IoC container</b> reads configuration (annotations, Java <code>@Configuration</code> classes or XML), creates objects called <b>beans</b>, wires their dependencies, and manages their lifecycle.</p>
<p><b>Containers:</b> <code>BeanFactory</code> (basic, lazy loading) and <code>ApplicationContext</code> (advanced: eager loading, events, internationalisation, AOP; used by Spring Boot).</p>
<h3>Dependency Injection (DI)</h3><p>DI is the technique used to implement IoC: the dependencies of a class are <b>provided from outside</b> by the container rather than created inside the class.</p>
<h3>Types of DI</h3><ol>
<li><b>Constructor Injection</b>: dependencies passed through the constructor. Ensures required dependencies are present at creation, supports immutable <code>final</code> fields, easiest to unit test. <b>Recommended</b> by Spring.</li>
<li><b>Setter Injection</b>: dependencies set through setter methods after the object is created (<code>@Autowired</code> on setter). Good for <b>optional</b> dependencies that may change.</li>
<li><b>Field Injection</b>: <code>@Autowired</code> directly on the field (via reflection). Least code, but hides dependencies, can't use final, and is harder to test.</li></ol>
<table class="tbl"><tr><th>Basis</th><th>Constructor</th><th>Setter</th><th>Field</th></tr>
<tr><td>When injected</td><td>At object creation</td><td>After creation</td><td>After creation (reflection)</td></tr>
<tr><td>Dependency type</td><td>Mandatory</td><td>Optional</td><td>Either</td></tr>
<tr><td>final fields / immutability</td><td>Yes</td><td>No</td><td>No</td></tr>
<tr><td>Testability</td><td>Best</td><td>Good</td><td>Poor</td></tr></table>
<h3>Bean Lifecycle</h3><p>Container starts → bean <b>instantiated</b> → <b>dependencies injected</b> → Aware callbacks → <code>@PostConstruct</code> / init-method → bean <b>ready</b> → on shutdown <code>@PreDestroy</code> / destroy-method.</p>
<h3>Advantages of IoC/DI</h3><ul><li><b>Loose coupling</b>: swap implementations without changing code.</li><li>Easier unit testing (inject mocks).</li><li>Less boilerplate, centralised configuration.</li><li>Container manages lifecycle and scope (singleton by default).</li></ul>`,
  diagram: `  WITHOUT IoC (tight coupling)          WITH IoC / DI (loose coupling)
  ┌──────────────────────┐             ┌───────────────────────────────┐
  │ class Car {          │             │  Spring IoC Container          │
  │   Engine e =         │             │  (ApplicationContext)          │
  │     new Engine();    │             │   creates ─▶ [Engine bean]     │
  │ }                    │             │   injects ─▶ [Car bean]        │
  └──────────────────────┘             └───────────────────────────────┘
  Car controls creation                 Container controls creation

  BEAN LIFECYCLE
  Instantiate ─▶ Inject deps ─▶ @PostConstruct ─▶ READY (use) ─▶ @PreDestroy`,
  code: [{ t: 'Three injection types', src: String.raw`interface Engine { String start(); }

@Component
class PetrolEngine implements Engine {
    public String start() { return "Petrol engine started"; }
}

@Component
class Car {                                   // 1. CONSTRUCTOR injection (recommended)
    private final Engine engine;
    @Autowired
    Car(Engine engine) { this.engine = engine; }
    void drive() { System.out.println(engine.start()); }
}

@Component
class Bike {                                  // 2. SETTER injection
    private Engine engine;
    @Autowired
    void setEngine(Engine engine) { this.engine = engine; }
}

@Component
class Truck {                                 // 3. FIELD injection
    @Autowired
    private Engine engine;
}`}],
  trick: `<b>IoC = "Don't call us, we'll call you"</b> (Hollywood principle). DI types: <b>C-S-F</b> → Constructor (best), Setter (optional), Field (shortest).`,
  quiz: [
    { q: 'In IoC, who creates objects?', o: ['The programmer with new', 'The Spring container', 'The JVM garbage collector', 'The database'], a: 1, why: 'Control of creation is inverted to the container.' },
    { q: 'Which injection supports final fields and is recommended?', o: ['Field', 'Setter', 'Constructor', 'None'], a: 2, why: 'Constructor injection allows immutability and mandatory deps.' },
    { q: 'Spring Boot mainly uses which container?', o: ['BeanFactory', 'ApplicationContext', 'ServletContext', 'JdbcContext'], a: 1, why: 'ApplicationContext is the advanced container.' }
  ]
},
{
  id: 'u3-annot', unit: 3, title: 'Spring Annotations (@Component, @Service, @Repository…)', marks: '5', mins: 12, imp: true,
  q: 'Explain the Spring annotations @Component, @Service, @Repository, @Autowired, @Configuration and @Bean with examples.',
  simple: `<p>Annotations are <b>labels</b> you stick on classes so Spring knows what to do with them. <code>@Component</code> = "Spring, please manage this object". <code>@Service</code> and <code>@Repository</code> are the same label with a more specific job title. <code>@Autowired</code> = "please hand me one of those". <code>@Bean</code> = "here's a recipe to make an object you can manage".</p>`,
  explore: [
    { k: '@Component', h: `<p><b>Generic stereotype.</b> Marks a class as a Spring-managed bean. Found automatically by <b>component scanning</b>.</p><pre>@Component\nclass EmailValidator { ... }</pre>` },
    { k: '@Service', h: `<p>Specialisation of @Component for the <b>service (business logic) layer</b>. Same behaviour, clearer meaning.</p><pre>@Service\nclass StudentService { ... }</pre>` },
    { k: '@Repository', h: `<p>Specialisation of @Component for the <b>DAO / data access layer</b>. Extra: translates database exceptions into Spring's <code>DataAccessException</code>.</p><pre>@Repository\ninterface StudentRepo extends JpaRepository&lt;Student, Long&gt; {}</pre>` },
    { k: '@Autowired', h: `<p>Tells Spring to <b>inject a dependency by type</b>. Works on constructors, setters and fields. Use <code>@Qualifier("name")</code> when there are multiple beans of the same type.</p><pre>@Autowired\nprivate StudentService service;</pre>` },
    { k: '@Configuration', h: `<p>Marks a class as a <b>source of bean definitions</b> (Java-based config instead of XML). It contains <code>@Bean</code> methods.</p>` },
    { k: '@Bean', h: `<p>Method-level. The <b>returned object is registered as a bean</b>. Used for third-party classes you can't annotate (e.g. RestTemplate, DateTimeFormatter).</p><pre>@Configuration\nclass AppConfig {\n  @Bean\n  RestTemplate restTemplate() { return new RestTemplate(); }\n}</pre>` },
    { k: '@SpringBootApplication', h: `<p>= <code>@Configuration</code> + <code>@EnableAutoConfiguration</code> + <code>@ComponentScan</code>. Put on the main class.</p>` }
  ],
  exploreTitle: 'Tap each annotation',
  answer: `<p>Spring uses annotations to define beans and wire dependencies without XML.</p>
<table class="tbl"><tr><th>Annotation</th><th>Level</th><th>Purpose</th></tr>
<tr><td>@Component</td><td>Class</td><td>Generic stereotype; marks a class as a Spring bean detected by component scanning.</td></tr>
<tr><td>@Service</td><td>Class</td><td>Specialised @Component for the business/service layer.</td></tr>
<tr><td>@Repository</td><td>Class</td><td>Specialised @Component for the DAO layer; enables exception translation to DataAccessException.</td></tr>
<tr><td>@Autowired</td><td>Constructor/setter/field</td><td>Injects a dependency automatically by type.</td></tr>
<tr><td>@Configuration</td><td>Class</td><td>Declares a class containing bean definitions (Java config).</td></tr>
<tr><td>@Bean</td><td>Method</td><td>The method's return value becomes a bean managed by the container.</td></tr></table>
<h3>Key differences</h3><ul>
<li>@Component, @Service, @Repository (and @Controller) all register beans; the specialised ones express the <b>layer</b> and add layer-specific features.</li>
<li><b>@Component vs @Bean:</b> @Component is on a <b>class</b> (auto-detected); @Bean is on a <b>method</b> inside @Configuration (explicit, for classes you don't own).</li></ul>`,
  diagram: `                @Component  (generic bean)
        ┌───────────────┼────────────────┐
    @Service        @Repository       @Controller
   (business)      (DAO + exception        │
                    translation)     @RestController

 @Configuration class ──contains──▶ @Bean methods ──return──▶ beans
 @Autowired  ──"give me a bean of this type"──▶  IoC container`,
  code: [{ t: 'StudentService auto-wired into a runner (lab 3.1)', src: String.raw`@Service
public class StudentService {
    public List<String> getStudents() {
        return List.of("Asha - CSE", "Ravi - IT", "Neha - ECE", "Aman - ME");
    }
}

@Configuration
public class AppConfig {
    @Bean
    public DateTimeFormatter formatter() { return DateTimeFormatter.ofPattern("dd-MM-yyyy"); }
}

@Component
public class CollegeApp implements CommandLineRunner {
    @Autowired private StudentService service;      // injected by type
    public void run(String... args) {
        service.getStudents().forEach(System.out::println);
    }
}`}],
  trick: `<b>C-S-R</b> = Component (any), Service (logic), Repository (DB). <b>@Bean on methods, @Component on classes.</b>`,
  quiz: [
    { q: 'Which adds DB exception translation?', o: ['@Service', '@Repository', '@Component', '@Bean'], a: 1, why: '@Repository translates persistence exceptions into DataAccessException.' },
    { q: '@Bean is placed on…', o: ['A class', 'A method in a @Configuration class', 'A field', 'An interface'], a: 1, why: 'Its return value becomes a bean.' },
    { q: '@Autowired injects by…', o: ['Name always', 'Type', 'Random', 'Order'], a: 1, why: 'By type; use @Qualifier to choose by name.' }
  ]
},
{
  id: 'u3-jpa', unit: 3, title: 'JPA Entity Annotations & Relationship Mappings', marks: '2 / 10', mins: 18, pyq: 'Q4 · 2M', imp: true,
  q: 'Explain the four JPA relationship mappings (@OneToOne, @OneToMany, @ManyToOne, @ManyToMany) with examples. <i>(Last year, 2M: Describe the purpose of @Entity and @Table.)</i>',
  simple: `<p><b>ORM</b> = Object ↔ Table translator. A Java <b>class</b> becomes a <b>table</b>, an <b>object</b> becomes a <b>row</b>, a <b>field</b> becomes a <b>column</b>. JPA is the rulebook; Hibernate is the engine that follows it. Relationships tell Hibernate where to put <b>foreign keys</b>.</p>`,
  learn: [
    { title: '@Entity / @Table', body: `<p><code>@Entity</code>: this class is a persistent entity mapped to a DB table. <code>@Table(name = "students")</code>: sets the exact table name (default = class name).</p>` },
    { title: '@Id / @GeneratedValue', body: `<p><code>@Id</code>: primary key. <code>@GeneratedValue(strategy = GenerationType.IDENTITY)</code>: DB auto-generates it (auto-increment). <code>@Column</code> customises a column.</p>` },
    { title: 'One-to-One', body: `<p>Person ↔ Passport. <code>@OneToOne</code> + <code>@JoinColumn(name = "passport_id")</code> puts the FK in person.</p>` },
    { title: 'One-to-Many', body: `<p>Department → many Employees. FK <code>dept_id</code> lives in <b>employee</b> (the "many" side, <code>@ManyToOne</code> + <code>@JoinColumn</code>). Department uses <code>@OneToMany(mappedBy = "department")</code>.</p>` },
    { title: 'Many-to-Many', body: `<p>Students ↔ Courses. Needs a <b>join table</b> (<code>student_course</code>) with two FKs, declared using <code>@JoinTable</code>.</p>` }
  ],
  widget: 'JpaRelations',
  short: `<p><b>@Entity</b> marks a Java class as a JPA entity, meaning its objects are persisted as rows in a database table and managed by Hibernate/JPA. <b>@Table</b> specifies the details of the table the entity maps to, mainly its <b>name</b> (<code>@Table(name = "students")</code>), plus schema/unique constraints. Without @Table, the table name defaults to the class name.</p>`,
  answer: `<p><b>JPA (Java Persistence API)</b> is a specification for ORM (Object-Relational Mapping) in Java. <b>Hibernate</b> is its most popular implementation. Spring Data JPA builds on it with ready-made repositories.</p>
<h3>Entity annotations</h3><ul>
<li><b>@Entity</b>: marks a class as a persistent entity (mapped to a table).</li>
<li><b>@Table(name="...")</b>: specifies the table name.</li>
<li><b>@Id</b>: primary key field.</li>
<li><b>@GeneratedValue(strategy=...)</b>: auto-generates the key (IDENTITY, SEQUENCE, TABLE, AUTO).</li>
<li><b>@Column(name, nullable, length, unique)</b>: column details.</li></ul>
<h3>Relationship mappings</h3><ol>
<li><b>@OneToOne</b>: one entity instance relates to exactly one other. E.g. Person–Passport. Owning side uses <code>@JoinColumn</code> (holds the FK).</li>
<li><b>@OneToMany</b>: one entity relates to many. E.g. one Department has many Employees. Usually the inverse side: <code>mappedBy = "department"</code>.</li>
<li><b>@ManyToOne</b>: many entities relate to one. E.g. many Employees belong to one Department. This is the <b>owning side</b> and holds the foreign key column (<code>@JoinColumn(name="dept_id")</code>).</li>
<li><b>@ManyToMany</b>: many-to-many. E.g. Students and Courses. Requires a <b>join table</b> defined with <code>@JoinTable</code> (joinColumns, inverseJoinColumns).</li></ol>
<h3>Important attributes</h3><ul>
<li><b>mappedBy</b>: marks the inverse (non-owning) side in a bidirectional relationship.</li>
<li><b>cascade</b> (<code>CascadeType.ALL, PERSIST, REMOVE</code>): propagate operations to related entities.</li>
<li><b>fetch</b>: <code>FetchType.LAZY</code> (load when accessed; default for *ToMany) or <code>EAGER</code> (load immediately; default for *ToOne).</li>
<li>Relationships can be <b>unidirectional</b> or <b>bidirectional</b>.</li></ul>`,
  diagram: ` @OneToOne    PERSON(id, name, passport_id FK) ──1:1── PASSPORT(id, number)

 @OneToMany / DEPARTMENT(id, name) ──1:N── EMPLOYEE(id, name, dept_id FK)
 @ManyToOne     (mappedBy side)              (owning side, @JoinColumn)

 @ManyToMany  STUDENT(id, name) ──┐                    ┌── COURSE(id, title)
                                  └── STUDENT_COURSE ──┘
                                     (student_id, course_id)  ← join table`,
  code: [{ t: 'Entity + relationships', src: String.raw`@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String name;

    @ManyToMany
    @JoinTable(name = "student_course",
               joinColumns = @JoinColumn(name = "student_id"),
               inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<Course> courses;
}

@Entity
class Department {
    @Id @GeneratedValue private Long id;
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<Employee> employees;
}

@Entity
class Employee {
    @Id @GeneratedValue private Long id;
    @ManyToOne
    @JoinColumn(name = "dept_id")          // foreign key here
    private Department department;
}`}],
  trick: `<b>The FK always lives on the "Many" side.</b> Many-to-many → a third <b>join table</b>. <b>mappedBy = "I'm not the owner"</b>.`,
  quiz: [
    { q: 'Which annotation marks the primary key?', o: ['@Table', '@Id', '@Column', '@Entity'], a: 1, why: '@Id marks the primary key field.' },
    { q: 'In Department–Employee, the foreign key column is in…', o: ['department', 'employee', 'a join table', 'both'], a: 1, why: 'The many side (@ManyToOne) owns the FK.' },
    { q: '@ManyToMany needs…', o: ['mappedBy only', 'A join table', 'No FK', '@GeneratedValue'], a: 1, why: 'A join table holds pairs of foreign keys.' },
    { q: 'Purpose of @Table?', o: ['Create primary key', 'Specify table name/details', 'Start a transaction', 'Inject beans'], a: 1, why: '@Table customises the mapped table.' }
  ]
},
{
  id: 'u3-rest', unit: 3, title: 'Spring Boot REST Controller (Student CRUD)', marks: '10', mins: 20, imp: true,
  q: 'Develop a Spring Boot REST controller for Student CRUD using @RestController, @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PathVariable and @RequestBody.',
  simple: `<p>A REST API is a <b>restaurant menu for programs</b>. The URL is the dish (<code>/students/1</code>) and the HTTP method is the action: <b>GET</b> = show me, <b>POST</b> = add new, <b>PUT</b> = change, <b>DELETE</b> = remove. Data travels as <b>JSON</b>, and every reply comes with a <b>status code</b> (200 OK, 404 not found…).</p>`,
  learn: [
    { title: 'REST', body: `<p><b>RE</b>presentational <b>S</b>tate <b>T</b>ransfer: an architecture where every <b>resource</b> has a URI and is manipulated with standard <b>HTTP methods</b>. It is <b>stateless</b>: each request carries all the info needed.</p>` },
    { title: 'CRUD ↔ HTTP', body: `<p>Create = <b>POST</b> (201) · Read = <b>GET</b> (200) · Update = <b>PUT</b> (200) · Delete = <b>DELETE</b> (204). Not found = <b>404</b>.</p>` },
    { title: '@RestController', body: `<p>= <code>@Controller</code> + <code>@ResponseBody</code>. Return values are written straight to the response as JSON (by <b>Jackson</b>). <code>@RequestMapping("/students")</code> sets the base URL.</p>` },
    { title: '@PathVariable', body: `<p>Reads a value from the URL: <code>@GetMapping("/{id}")</code> + <code>@PathVariable int id</code> → <code>/students/5</code> gives id = 5.</p>` },
    { title: '@RequestBody', body: `<p>Converts the JSON request body into a Java object: <code>@PostMapping</code> + <code>@RequestBody Student s</code>.</p>` }
  ],
  widget: 'RestSimulator',
  answer: `<h3>REST architecture</h3><p>REST (Representational State Transfer) is an architectural style for web services where data is treated as <b>resources</b> identified by <b>URIs</b> and manipulated using HTTP methods. Principles: <b>client-server</b>, <b>stateless</b>, <b>cacheable</b>, <b>uniform interface</b>, <b>layered system</b>.</p>
<table class="tbl"><tr><th>Operation</th><th>HTTP method</th><th>URL</th><th>Annotation</th><th>Status</th></tr>
<tr><td>Read all</td><td>GET</td><td>/students</td><td>@GetMapping</td><td>200 OK</td></tr>
<tr><td>Read one</td><td>GET</td><td>/students/{id}</td><td>@GetMapping("/{id}")</td><td>200 / 404</td></tr>
<tr><td>Create</td><td>POST</td><td>/students</td><td>@PostMapping</td><td>201 Created</td></tr>
<tr><td>Update</td><td>PUT</td><td>/students/{id}</td><td>@PutMapping("/{id}")</td><td>200 / 404</td></tr>
<tr><td>Delete</td><td>DELETE</td><td>/students/{id}</td><td>@DeleteMapping("/{id}")</td><td>204 / 404</td></tr></table>
<h3>Annotations</h3><ul>
<li><b>@RestController</b>: marks the class as a REST controller (= @Controller + @ResponseBody); returns JSON.</li>
<li><b>@RequestMapping("/students")</b>: base URL for all handler methods.</li>
<li><b>@GetMapping / @PostMapping / @PutMapping / @DeleteMapping</b>: map HTTP methods to handler methods.</li>
<li><b>@PathVariable</b>: binds a URI template variable (<code>{id}</code>) to a method parameter.</li>
<li><b>@RequestBody</b>: deserialises the JSON request body into a Java object.</li>
<li><b>ResponseEntity</b>: lets you set the status code, headers and body.</li></ul>
<h3>JSON with Jackson</h3><p>Spring Boot includes <b>Jackson</b>, which automatically converts Java objects ⇄ JSON using getters/setters and a no-arg constructor.</p>
<h3>Consuming REST APIs</h3><p><b>RestTemplate</b> (synchronous): <code>getForObject(url, Student.class)</code>, <code>postForObject(...)</code>. <b>WebClient</b> (non-blocking, reactive): <code>webClient.get().uri(...).retrieve().bodyToMono(Student.class)</code>. APIs are tested with <b>Postman</b>.</p>`,
  diagram: ` Postman / Browser                  Spring Boot App
 ┌───────────┐  HTTP request + JSON  ┌──────────────────────┐   ┌─────────┐
 │  Client   │ ─────────────────────▶│ @RestController       │──▶│ Service │──▶ List/DB
 │           │ ◀─────────────────────│ StudentController     │◀──│         │
 └───────────┘  JSON + status code   └──────────────────────┘   └─────────┘
                 (Jackson: Java object ⇄ JSON)`,
  code: [{ t: 'StudentController (in-memory list)', src: String.raw`@RestController
@RequestMapping("/students")
public class StudentController {
    private List<Student> list = new ArrayList<>();

    @GetMapping                                          // GET /students
    public List<Student> getAll() { return list; }

    @GetMapping("/{id}")                                 // GET /students/1
    public ResponseEntity<Student> getById(@PathVariable int id) {
        return list.stream().filter(s -> s.getId() == id).findFirst()
                   .map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());          // 404
    }

    @PostMapping                                         // POST /students  + JSON body
    public ResponseEntity<Student> add(@RequestBody Student s) {
        list.add(s);
        return ResponseEntity.status(HttpStatus.CREATED).body(s);      // 201
    }

    @PutMapping("/{id}")                                 // PUT /students/1
    public Student update(@PathVariable int id, @RequestBody Student s) {
        list.removeIf(x -> x.getId() == id);
        s.setId(id);
        list.add(s);
        return s;
    }

    @DeleteMapping("/{id}")                              // DELETE /students/1
    public ResponseEntity<Void> delete(@PathVariable int id) {
        list.removeIf(x -> x.getId() == id);
        return ResponseEntity.noContent().build();                      // 204
    }
}`}],
  trick: `<b>CRUD = POST, GET, PUT, DELETE</b>. <b>Path</b>Variable = from the <b>URL path</b>; Request<b>Body</b> = from the JSON <b>body</b>. Status: <b>200 ok, 201 created, 204 deleted, 404 missing</b>.`,
  quiz: [
    { q: 'Which annotation reads {id} from the URL?', o: ['@RequestBody', '@PathVariable', '@RequestMapping', '@Autowired'], a: 1, why: '@PathVariable binds URI template variables.' },
    { q: 'Status code for a successful creation?', o: ['200', '201', '204', '404'], a: 1, why: '201 Created.' },
    { q: '@RestController equals…', o: ['@Controller + @ResponseBody', '@Service + @Repository', '@Component + @Bean', '@Entity + @Table'], a: 0, why: 'It returns data (JSON) instead of a view.' },
    { q: 'Which library converts Java objects to JSON in Spring Boot?', o: ['Hibernate', 'Jackson', 'JDBC', 'Tomcat'], a: 1, why: 'Jackson is included by default.' }
  ]
},
{
  id: 'u3-patterns', unit: 3, title: 'Design Patterns: Singleton, Factory, Observer, Strategy', marks: '5 / 10', mins: 18, imp: true,
  q: 'Explain the Singleton and Factory design patterns with programs. Differentiate between Creational and Behavioral patterns. <i>(Also: Observer, Strategy.)</i>',
  simple: `<p>Design patterns are <b>proven recipes</b> for common coding problems.</p><ul>
<li><b>Singleton</b>: a country has only <b>one</b> President.</li>
<li><b>Factory</b>: you order "a pizza" at the counter; the kitchen decides which class of pizza to make.</li>
<li><b>Observer</b>: YouTube subscribers get notified when a new video is uploaded.</li>
<li><b>Strategy</b>: Google Maps lets you swap the route algorithm: car, bike, walk.</li></ul>`,
  learn: [
    { title: 'Design pattern', body: `<p>A reusable, tested solution to a commonly occurring software design problem. Catalogued by the "Gang of Four" (GoF): 23 patterns in 3 categories: <b>Creational, Structural, Behavioral</b>.</p>` },
    { title: 'Singleton', body: `<p><b>Only one instance</b> + global access. Recipe: <b>private constructor</b>, <b>private static instance</b>, <b>public static getInstance()</b>. Used for logger, config, DB connection. Spring beans are singleton by default.</p>` },
    { title: 'Factory', body: `<p>A factory method creates objects <b>without exposing the creation logic</b>. The client passes a type ("circle") and gets an object of the common interface (<code>Shape</code>).</p>` },
    { title: 'Observer', body: `<p><b>One-to-many</b>: when the subject changes state, all subscribed observers are notified automatically. E.g. new product added → inventory and email services notified.</p>` },
    { title: 'Strategy', body: `<p>A family of algorithms, each in its own class, <b>interchangeable at runtime</b>. E.g. CarInsurance / BikeInsurance / TruckInsurance chosen from the request.</p>` }
  ],
  widget: 'PatternsDemo',
  answer: `<p>A <b>design pattern</b> is a general, reusable solution to a commonly occurring problem in software design. Patterns are grouped into <b>Creational</b> (object creation), <b>Structural</b> (composition of classes/objects) and <b>Behavioral</b> (communication between objects).</p>
<h3>1. Singleton (Creational)</h3><p>Ensures a class has <b>only one instance</b> and provides a global point of access to it.</p><ul><li><b>Private constructor</b> stops <code>new</code> from outside.</li><li><b>Private static</b> variable holds the single instance.</li><li><b>Public static getInstance()</b> creates it on first call (lazy) and returns the same object afterwards.</li><li>Thread-safe version uses <code>synchronized</code> / double-checked locking.</li></ul><p><b>Uses:</b> logging, configuration, DB connection pool, caches.</p>
<h3>2. Factory (Creational)</h3><p>Defines a method that <b>creates and returns objects</b> of a common interface based on input, hiding the instantiation logic from the client. <b>Uses:</b> <code>Calendar.getInstance()</code>, Spring's BeanFactory. <b>Benefit:</b> loose coupling; new types added without changing the client.</p>
<h3>3. Observer (Behavioral)</h3><p>Defines a one-to-many dependency: when the <b>subject</b> changes, all <b>observers</b> are notified. Used in event handling, notifications.</p>
<h3>4. Strategy (Behavioral)</h3><p>Encapsulates interchangeable algorithms behind a common interface so the algorithm can be selected <b>at runtime</b>. In Spring, strategies can be beans injected into a <code>Map&lt;String, Strategy&gt;</code>.</p>
<h3>Creational vs Behavioral</h3>
<table class="tbl"><tr><th>Creational</th><th>Behavioral</th></tr>
<tr><td>Deal with <b>object creation</b></td><td>Deal with <b>communication & responsibility</b> between objects</td></tr>
<tr><td>Hide how objects are created</td><td>Define how objects interact and share work</td></tr>
<tr><td>Make the system independent of creation details</td><td>Make interactions flexible, loosely coupled</td></tr>
<tr><td>Singleton, Factory, Abstract Factory, Builder, Prototype</td><td>Observer, Strategy, Command, Iterator, Template Method</td></tr></table>`,
  diagram: ` SINGLETON                         FACTORY
 ┌───────────────────────┐          Client ──"circle"──▶ ShapeFactory.getShape()
 │ DBConnection          │                                     │
 │ - static instance     │               ┌─────────────────────┼──────────────┐
 │ - DBConnection()  pvt │               ▼                     ▼              ▼
 │ + getInstance()       │            Circle                Square        Triangle
 └───────────────────────┘          (all implement Shape)
 every call → SAME object

 OBSERVER                              STRATEGY
 ProductService (subject)              InsuranceService ──uses──▶ «InsuranceStrategy»
   addProduct() → notify all                                    ├ CarInsurance
   ├─▶ InventoryService.update()                                ├ BikeInsurance
   └─▶ EmailService.update()                                    └ TruckInsurance`,
  code: [{ t: 'Singleton + Factory', src: String.raw`class DBConnection {                                   // SINGLETON
    private static DBConnection instance;
    private DBConnection() { System.out.println("Connected"); }
    public static synchronized DBConnection getInstance() {
        if (instance == null) instance = new DBConnection();   // created once
        return instance;
    }
}

interface Shape { void draw(); }                       // FACTORY
class Circle implements Shape { public void draw() { System.out.println("Circle"); } }
class Square implements Shape { public void draw() { System.out.println("Square"); } }

class ShapeFactory {
    static Shape getShape(String type) {
        if (type.equalsIgnoreCase("circle")) return new Circle();
        if (type.equalsIgnoreCase("square")) return new Square();
        throw new IllegalArgumentException("Unknown shape");
    }
}

public class Main {
    public static void main(String[] args) {
        DBConnection a = DBConnection.getInstance();
        DBConnection b = DBConnection.getInstance();
        System.out.println(a == b);                    // true

        ShapeFactory.getShape("circle").draw();        // Circle
    }
}`}],
  trick: `Singleton recipe: <b>"Private, Static, Get"</b>. <b>Creational = birth</b> of objects; <b>Behavioral = behaviour/talking</b> between objects.`,
  quiz: [
    { q: 'What stops creating a 2nd Singleton object with new?', o: ['static method', 'private constructor', 'final class', 'interface'], a: 1, why: 'The constructor is private.' },
    { q: 'Observer is a … pattern.', o: ['Creational', 'Structural', 'Behavioral', 'Architectural'], a: 2, why: 'It defines communication between objects.' },
    { q: 'Factory pattern mainly…', o: ['Ensures one instance', 'Hides object creation logic', 'Notifies subscribers', 'Sorts objects'], a: 1, why: 'The client asks the factory instead of calling new.' }
  ]
},
{
  id: 'u3-servlet', unit: 3, title: 'Servlet Lifecycle & HttpServletRequest/Response', marks: '2 / 5', mins: 15, pyq: 'Q3 · 2M + Q8 · 5M',
  q: "Explain the Servlet lifecycle and create a servlet using HttpServletRequest and HttpServletResponse that receives a student's name and displays a welcome message. <i>(2M: function of HttpServletRequest in handling form input.)</i>",
  simple: `<p>A servlet is a Java class that lives inside a web server (Tomcat) and <b>answers browser requests</b>. Think of a <b>post office counter</b>: the <b>request</b> is the envelope coming in (with form data inside); the <b>response</b> is the reply envelope you write and send back (HTML).</p>`,
  learn: [
    { title: 'Servlet', body: `<p>A <b>servlet</b> is a server-side Java program that runs in a <b>web container</b> (Tomcat), handles HTTP requests and generates dynamic responses. Usually extends <code>HttpServlet</code>.</p>` },
    { title: 'init()', body: `<p>Container loads the class and creates <b>one object</b>. <code>init()</code> is called <b>once</b> for initialisation (e.g. open DB connection).</p>` },
    { title: 'service()', body: `<p>Called for <b>every request</b>. In HttpServlet it dispatches to <code>doGet()</code> or <code>doPost()</code> depending on the HTTP method.</p>` },
    { title: 'destroy()', body: `<p>Called <b>once</b> before the servlet is removed (server shutdown). Release resources here.</p>` },
    { title: 'Request / Response', body: `<p><code>HttpServletRequest</code>: read input: <code>getParameter("name")</code>, headers, session.<br><code>HttpServletResponse</code>: write output: <code>setContentType("text/html")</code>, <code>getWriter()</code>, <code>sendRedirect()</code>.</p>` }
  ],
  widget: 'ServletLifecycle',
  short: `<p><b>HttpServletRequest</b> is an object created by the web container that carries all information about the client's HTTP request. In form handling, it is used to <b>read the submitted form data</b> with <code>request.getParameter("fieldName")</code> (or <code>getParameterValues()</code> for multi-select). It also provides headers, the HTTP method, cookies, the session (<code>getSession()</code>) and lets you set attributes and forward the request.</p>`,
  answer: `<p>A <b>Servlet</b> is a Java class that runs on a web server inside a <b>servlet container</b> (e.g. Apache Tomcat), receives HTTP requests and produces dynamic responses. It is the controller in Java web apps.</p>
<h3>Servlet Lifecycle (managed by the container)</h3><ol>
<li><b>Loading & instantiation</b>: the container loads the servlet class and creates a single instance (on first request or at startup).</li>
<li><b>init(ServletConfig)</b>: called <b>once</b> to initialise resources.</li>
<li><b>service(request, response)</b>: called <b>for every request</b>; HttpServlet's service() dispatches to <code>doGet()</code>, <code>doPost()</code> etc. Each request runs in a separate thread.</li>
<li><b>destroy()</b>: called <b>once</b> before the servlet is taken out of service, to release resources. Then the object is garbage collected.</li></ol>
<h3>HttpServletRequest</h3><p>Represents the client request. Methods: <code>getParameter(name)</code>, <code>getParameterValues()</code>, <code>getMethod()</code>, <code>getHeader()</code>, <code>getSession()</code>, <code>setAttribute()/getAttribute()</code>, <code>getRequestDispatcher()</code>.</p>
<h3>HttpServletResponse</h3><p>Used to send the response. Methods: <code>setContentType("text/html")</code>, <code>getWriter()</code> (PrintWriter), <code>sendRedirect(url)</code>, <code>setStatus()</code>, <code>addCookie()</code>.</p>
<h3>GET vs POST</h3><table class="tbl"><tr><th>GET</th><th>POST</th></tr><tr><td>Data in URL (query string)</td><td>Data in request body</td></tr><tr><td>Limited size, bookmarkable</td><td>No size limit, not bookmarkable</td></tr><tr><td>Less secure</td><td>More secure for form data</td></tr><tr><td>doGet()</td><td>doPost()</td></tr></table>
<h3>Working of the Welcome servlet</h3><p>The HTML form posts <code>studentName</code> to <code>/welcome</code>. The container calls <code>doPost()</code>; the servlet reads the name with <code>request.getParameter()</code>, sets the content type, and writes an HTML welcome message using <code>response.getWriter()</code>.</p>`,
  diagram: ` Browser (form)                    Web Container (Tomcat)
 ┌──────────────┐ HTTP request ┌──────────────────────────────────────┐
 │ studentName= │ ───────────▶ │ 1. load class, create object (once)  │
 │   "Asha"     │              │ 2. init()      ← once                │
 └──────────────┘              │ 3. service()   ← every request       │
        ▲    HTML response     │      ├─ doGet()                      │
        └───────────────────── │      └─ doPost()                     │
                               │ 4. destroy()   ← once, at shutdown   │
                               └──────────────────────────────────────┘
  HttpServletRequest  → read input   (getParameter)
  HttpServletResponse → write output (setContentType, getWriter)`,
  code: [
    { t: 'index.html', lang: 'markup', src: String.raw`<form action="welcome" method="post">
    Name: <input type="text" name="studentName">
    <input type="submit" value="Submit">
</form>`},
    { t: 'WelcomeServlet.java', src: String.raw`import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/welcome")
public class WelcomeServlet extends HttpServlet {

    public void init() { System.out.println("init: called once"); }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String name = request.getParameter("studentName");       // read form input

        response.setContentType("text/html");                    // write output
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h2>Welcome, " + name + "!</h2>");
        out.println("</body></html>");
    }

    public void destroy() { System.out.println("destroy: called once"); }
}`}
  ],
  trick: `Lifecycle: <b>"I Serve Daily"</b> → Init (once), Service (every request), Destroy (once).<br>Request = <b>IN</b>put, Response = <b>OUT</b>put.`,
  quiz: [
    { q: 'How many times is init() called?', o: ['Every request', 'Once', 'Twice', 'Never'], a: 1, why: 'Once, after the servlet object is created.' },
    { q: 'Which reads a form field value?', o: ['response.getWriter()', 'request.getParameter()', 'response.setContentType()', 'request.getWriter()'], a: 1, why: 'HttpServletRequest.getParameter(name).' },
    { q: 'A POST form submission is handled by…', o: ['doGet()', 'doPost()', 'init()', 'destroy()'], a: 1, why: 'service() dispatches POST to doPost().' }
  ]
},
{
  id: 'u3-layered', unit: 3, title: 'Spring + Hibernate Layered Architecture', marks: '5', mins: 15, pyq: 'Q9 · 5M',
  q: 'Demonstrate how Spring and Hibernate work together in a layered architecture using annotations. Focus on service, DAO and controller layers.',
  simple: `<p>A restaurant again: the <b>waiter</b> (Controller) takes your order, the <b>chef</b> (Service) decides how to cook it, the <b>storekeeper</b> (Repository/DAO) fetches ingredients from the <b>store room</b> (Database). Hibernate is the storekeeper's <b>translator</b> who speaks SQL. Nobody skips a level.</p>`,
  learn: [
    { title: 'Controller', body: `<p><code>@RestController</code>: receives HTTP requests, validates input, calls the service, returns the response (JSON). No business logic here.</p>` },
    { title: 'Service', body: `<p><code>@Service</code>: business logic & rules (e.g. check stock, calculate price). Transaction boundaries with <code>@Transactional</code>.</p>` },
    { title: 'Repository / DAO', body: `<p><code>@Repository</code> interface extending <code>JpaRepository&lt;Product, Long&gt;</code>. Spring Data generates <code>save, findAll, findById, deleteById</code>, plus queries from method names like <code>findByName</code>.</p>` },
    { title: 'Hibernate', body: `<p>The <b>JPA provider / ORM</b>. Converts <code>@Entity</code> objects into SQL (insert/select/update) and results back into objects.</p>` },
    { title: 'Glue', body: `<p>Spring <b>DI</b> injects Repository → Service → Controller. Spring Boot <b>auto-configures</b> the DataSource, Hibernate and transactions from <code>application.properties</code>.</p>` }
  ],
  widget: 'LayeredFlow',
  answer: `<p>In a <b>layered architecture</b>, the application is divided into layers, each with one responsibility, and each layer communicates only with the layer below it. <b>Spring</b> provides IoC/DI, web and transaction management; <b>Hibernate</b> (via Spring Data JPA) provides ORM persistence.</p>
<h3>Layers</h3><ol>
<li><b>Controller layer</b> (<code>@RestController</code>/<code>@Controller</code>): handles HTTP requests and responses; maps URLs with @GetMapping etc.; delegates to the service.</li>
<li><b>Service layer</b> (<code>@Service</code>): contains business logic and validation; defines transactions using <code>@Transactional</code>.</li>
<li><b>DAO / Repository layer</b> (<code>@Repository</code>): performs database operations. Extending <code>JpaRepository</code> gives CRUD methods automatically.</li>
<li><b>Entity / Model</b> (<code>@Entity</code>, <code>@Table</code>, <code>@Id</code>): Java classes mapped to tables.</li>
<li><b>Database</b>: MySQL/H2, accessed by Hibernate through JDBC.</li></ol>
<h3>How Spring and Hibernate work together</h3><ul>
<li>Spring Boot reads <code>application.properties</code> and auto-configures the <b>DataSource</b>, <b>EntityManagerFactory</b> (Hibernate as JPA provider) and <b>transaction manager</b>.</li>
<li>Spring's IoC container creates beans for each layer and <b>injects</b> them (Repository → Service → Controller) using <code>@Autowired</code>/constructor injection.</li>
<li>Hibernate maps entities to tables, generates SQL, manages the persistence context and, with <code>ddl-auto=update</code>, creates tables.</li>
<li><code>@Transactional</code> on service methods wraps operations in a transaction: commit on success, rollback on runtime exception.</li></ul>
<h3>Advantages</h3><p>Separation of concerns, loose coupling, easier testing and maintenance, reusability, less boilerplate (no manual JDBC/SQL).</p>`,
  diagram: `   Client (Postman / Browser)
          │  HTTP + JSON
  ┌───────▼──────────────────────┐
  │ CONTROLLER   @RestController   │  request/response, URL mapping
  └───────┬──────────────────────┘
          │  calls (injected via DI)
  ┌───────▼──────────────────────┐
  │ SERVICE      @Service         │  business logic, @Transactional
  └───────┬──────────────────────┘
          │  calls
  ┌───────▼──────────────────────┐
  │ DAO / REPOSITORY @Repository  │  extends JpaRepository
  └───────┬──────────────────────┘
          │  Hibernate (ORM) → SQL
  ┌───────▼──────────────────────┐
  │ DATABASE  MySQL               │  tables from @Entity
  └──────────────────────────────┘`,
  code: [
    { t: 'application.properties', lang: 'none', src: String.raw`spring.datasource.url=jdbc:mysql://localhost:3306/shopdb
spring.datasource.username=root
spring.datasource.password=root
# Hibernate creates/updates tables automatically
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true`},
    { t: 'Entity → DAO → Service → Controller', src: String.raw`@Entity
@Table(name = "products")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    // getters, setters
}

@Repository                                            // DAO layer
public interface ProductRepository extends JpaRepository<Product, Long> { }

@Service                                               // Service layer
public class ProductService {
    @Autowired private ProductRepository repo;
    public List<Product> getAll() { return repo.findAll(); }
    @Transactional
    public Product save(Product p) { return repo.save(p); }
}

@RestController                                        // Controller layer
@RequestMapping("/api/products")
public class ProductController {
    @Autowired private ProductService service;
    @GetMapping  public List<Product> all()                  { return service.getAll(); }
    @PostMapping public Product add(@RequestBody Product p)  { return service.save(p); }
}`}
  ],
  trick: `<b>C → S → R → DB</b> ("Can Students Read Databases?"). <b>Spring = glue (DI), Hibernate = translator (ORM)</b>.`,
  quiz: [
    { q: 'Business logic belongs in…', o: ['Controller', 'Service', 'Repository', 'Entity'], a: 1, why: 'The service layer holds business rules.' },
    { q: 'Who generates SQL from entity operations?', o: ['Spring MVC', 'Hibernate', 'Jackson', 'Tomcat'], a: 1, why: 'Hibernate is the ORM / JPA provider.' },
    { q: 'JpaRepository gives you…', o: ['HTML pages', 'Ready CRUD methods like save/findAll', 'Thread pools', 'JSON parsing'], a: 1, why: 'Spring Data JPA generates implementations.' }
  ]
},
{
  id: 'u3-jsp', unit: 3, title: 'JSP Components & Student Attendance Portal', marks: '10', mins: 25, pyq: 'Q11 + Q12 · 10M',
  q: 'Develop a JSP-based Student Attendance Portal where data is saved to a database using Servlets and JDBC. <i>Also (OR question): evaluate JSP components (scriptlets, declarations, directives, include tag, expression language) and how they enhance reusability.</i>',
  simple: `<p>A <b>Servlet</b> is Java code that prints HTML (awkward). <b>JSP</b> is the opposite: an <b>HTML page with small Java bits</b> inside (easy to design). Behind the scenes the server converts every JSP into a servlet. In the attendance portal: <b>JSP = the form & result page</b>, <b>Servlet = the brain</b> that saves data using <b>JDBC</b>.</p>`,
  learn: [
    { title: 'JSP', body: `<p><b>Java Server Pages</b>: server-side technology to create dynamic web pages by embedding Java in HTML. The container <b>translates</b> each JSP into a servlet and compiles it.</p>` },
    { title: 'Lifecycle', body: `<p>Translation (.jsp → .java) → Compilation (.class) → Load → <code>jspInit()</code> → <code>_jspService()</code> per request → <code>jspDestroy()</code>.</p>` },
    { title: 'Components', body: `<p><b>Directive</b> <code>&lt;%@ %&gt;</code> · <b>Scriptlet</b> <code>&lt;% %&gt;</code> · <b>Expression</b> <code>&lt;%= %&gt;</code> · <b>Declaration</b> <code>&lt;%! %&gt;</code> · <b>Action</b> <code>&lt;jsp:include&gt;</code> · <b>EL</b> <code>\${...}</code>.</p>` },
    { title: 'Portal flow', body: `<p><b>attendance.jsp</b> form (roll, name, date, status) → POST → <b>AttendanceServlet</b> reads <code>getParameter()</code> → JDBC <b>PreparedStatement INSERT</b> → sets a message → forwards to <b>success.jsp</b>, which shows it with EL.</p>` },
    { title: 'Reusability', body: `<p>Include directive/action reuse header/footer; EL + JSTL remove Java from pages; taglibs reuse custom tags; MVC separates view (JSP) from logic (Servlet).</p>` }
  ],
  widget: 'JspDemo',
  answer: `<h3>Introduction</h3><p><b>JSP (Java Server Pages)</b> is a server-side technology for building dynamic web pages by embedding Java code in HTML. Each JSP is translated into a servlet by the container. It provides <b>implicit objects</b>: request, response, out, session, application, config, pageContext, page, exception.</p>
<h3>JSP Lifecycle</h3><p>Translation → Compilation → Loading & Instantiation → <code>jspInit()</code> → <code>_jspService()</code> (every request) → <code>jspDestroy()</code>.</p>
<h3>JSP Components</h3>
<table class="tbl"><tr><th>Component</th><th>Syntax</th><th>Use</th></tr>
<tr><td>Directive</td><td>&lt;%@ page / include / taglib %&gt;</td><td>Instructions to container at translation (imports, include files, tag libraries)</td></tr>
<tr><td>Scriptlet</td><td>&lt;% java code %&gt;</td><td>Java statements inside _jspService()</td></tr>
<tr><td>Expression</td><td>&lt;%= expression %&gt;</td><td>Prints a value to the page</td></tr>
<tr><td>Declaration</td><td>&lt;%! int x; void f(){} %&gt;</td><td>Class-level variables/methods</td></tr>
<tr><td>Include action</td><td>&lt;jsp:include page="x.jsp"/&gt;</td><td>Includes a page at request time (dynamic)</td></tr>
<tr><td>Expression Language</td><td>\${param.name}, \${msg}</td><td>Accesses data without Java code</td></tr></table>
<h3>How they enhance reusability (Q12 "justify")</h3><ul>
<li><b>Include directive</b> (static, at translation) and <b>&lt;jsp:include&gt;</b> (dynamic, at request): write header/footer/menu <b>once</b> and reuse on every page; one change updates all pages.</li>
<li><b>taglib directive + JSTL/custom tags</b>: reusable tag libraries replace repeated Java code.</li>
<li><b>Expression Language</b>: removes scriptlets, keeping pages clean, readable and maintainable.</li>
<li><b>Declarations</b>: helper methods defined once and reused within the page.</li>
<li>Scriptlets mix logic with presentation and <b>reduce</b> reusability, so modern apps prefer EL + JSTL + MVC.</li></ul>
<h3>Student Attendance Portal (Q11): design</h3><ol>
<li><b>Database table</b> <code>attendance(id, roll_no, name, att_date, status)</code>.</li>
<li><b>attendance.jsp (View)</b>: HTML form with roll no, name, date, Present/Absent; <code>action="AttendanceServlet" method="post"</code>; header reused via include directive.</li>
<li><b>AttendanceServlet (Controller)</b>: <code>doPost()</code> reads fields with <code>request.getParameter()</code>, opens a JDBC connection, inserts using <b>PreparedStatement</b>, sets a message attribute.</li>
<li><b>success.jsp (View)</b>: forwarded via <code>RequestDispatcher</code>; shows <code>\${msg}</code> using EL.</li>
<li>Follows <b>MVC</b>: JSP = View, Servlet = Controller, DB/JDBC = Model.</li></ol>
<h3>Advantages of JSP</h3><p>Easier than writing HTML in servlets, separation of presentation, automatic recompilation, implicit objects, reusable components.</p>`,
  diagram: ` attendance.jsp (form) ──POST──▶ AttendanceServlet ──JDBC──▶ MySQL: attendance table
        ▲                       │ request.getParameter()
        │                       │ PreparedStatement INSERT
        └─── success.jsp ◀──────┘ request.setAttribute("msg") + forward
           shows \${msg} (EL)

 JSP LIFECYCLE
 .jsp ─translate─▶ .java (servlet) ─compile─▶ .class
      ─▶ jspInit() ─▶ _jspService() (each request) ─▶ jspDestroy()`,
  code: [
    { t: 'attendance.jsp (View)', lang: 'markup', src: String.raw`<%@ page contentType="text/html" %>
<%@ include file="header.jsp" %>
<h2>Student Attendance</h2>
<form action="AttendanceServlet" method="post">
    Roll No: <input type="number" name="roll"><br>
    Name:    <input type="text" name="name"><br>
    Date:    <input type="date" name="date"><br>
    Status:  <select name="status"><option>Present</option><option>Absent</option></select>
    <input type="submit" value="Mark">
</form>`},
    { t: 'AttendanceServlet.java (Controller + JDBC)', src: String.raw`@WebServlet("/AttendanceServlet")
public class AttendanceServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        int roll      = Integer.parseInt(req.getParameter("roll"));
        String name   = req.getParameter("name");
        String date   = req.getParameter("date");
        String status = req.getParameter("status");
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/college", "root", "root");
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO attendance (roll_no, name, att_date, status) VALUES (?, ?, ?, ?)");
            ps.setInt(1, roll);
            ps.setString(2, name);
            ps.setDate(3, java.sql.Date.valueOf(date));
            ps.setString(4, status);
            ps.executeUpdate();
            con.close();
            req.setAttribute("msg", "Attendance saved for " + name);
        } catch (Exception e) {
            req.setAttribute("msg", "Error: " + e.getMessage());
        }
        req.getRequestDispatcher("success.jsp").forward(req, res);
    }
}`},
    { t: 'success.jsp (all JSP components)', lang: 'markup', src: String.raw`<%@ page import="java.util.Date" %>          <%-- directive --%>
<jsp:include page="header.jsp" />           <%-- include action --%>
<%! int visits = 0; %>                      <%-- declaration --%>
<% visits++; %>                             <%-- scriptlet --%>
<h3>#{msg}</h3>                             <%-- expression language --%>
<p>Visits: <%= visits %> | <%= new Date() %></p>   <%-- expressions --%>`},
    { t: 'SQL table', lang: 'sql', src: String.raw`CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  roll_no INT, name VARCHAR(50), att_date DATE, status VARCHAR(10)
);`}
  ],
  trick: `JSP tags by symbol: <b>@</b> = directive, <b>!</b> = declaration, <b>=</b> = expression, plain <b>%</b> = scriptlet, <b>$</b> = EL.<br>Portal = <b>Form (JSP) → Servlet → JDBC → DB → JSP</b>.`,
  quiz: [
    { q: '<code>&lt;%= x %&gt;</code> is a…', o: ['Scriptlet', 'Expression', 'Declaration', 'Directive'], a: 1, why: 'It prints the value of x.' },
    { q: 'Which include happens at request time (dynamic)?', o: ['&lt;%@ include file %&gt;', '&lt;jsp:include page /&gt;', 'taglib', 'page directive'], a: 1, why: 'The include action is dynamic; the directive is static (translation time).' },
    { q: 'A JSP is converted into a…', o: ['Applet', 'Servlet', 'Bean', 'Thread'], a: 1, why: 'The container translates JSP into a servlet.' },
    { q: 'In the portal, which reads form data?', o: ['success.jsp', 'AttendanceServlet via getParameter()', 'MySQL', 'web.xml'], a: 1, why: 'The servlet (controller) reads request parameters.' }
  ]
},
{
  id: 'u3-bank', unit: 3, title: 'Spring-Hibernate Banking: @Transactional Fund Transfer', marks: '10', mins: 22, pyq: 'Q13 · 10M',
  q: 'Create a Spring-Hibernate based banking system that allows users to transfer funds between accounts with transaction management. <i>(Also: @OneToMany/@ManyToOne, rollback, @ControllerAdvice, @ExceptionHandler.)</i>',
  simple: `<p>Transferring ₹1000 = <b>two steps</b>: take from A, give to B. If the server crashes after step 1, money disappears! A <b>transaction</b> makes the steps <b>all-or-nothing</b>: either both happen (commit) or neither does (rollback). In Spring you get this with one annotation: <code>@Transactional</code>.</p>`,
  learn: [
    { title: 'Transaction', body: `<p>A group of DB operations executed as a single unit. Follows <b>ACID</b>: <b>A</b>tomicity (all or nothing), <b>C</b>onsistency (valid state), <b>I</b>solation (no interference), <b>D</b>urability (saved permanently).</p>` },
    { title: 'Entities', body: `<p><code>Customer</code> <b>@OneToMany</b> <code>Account</code>; <code>Account</code> <b>@ManyToOne</b> <code>Customer</code> (FK customer_id). <code>AccountRepository extends JpaRepository</code>.</p>` },
    { title: '@Transactional', body: `<p>Spring wraps the service method in a proxy: <b>begin</b> → run method → <b>commit</b> if OK, <b>rollback</b> if a <b>RuntimeException</b> is thrown. (Checked exceptions need <code>rollbackFor = Exception.class</code>.)</p>` },
    { title: 'Custom exception', body: `<p><code>InsufficientFundsException extends RuntimeException</code>, thrown when balance &lt; amount → automatic rollback.</p>` },
    { title: '@ControllerAdvice', body: `<p>A global exception handler class. Its <code>@ExceptionHandler(InsufficientFundsException.class)</code> method returns a clean <b>JSON error</b> (status 400, message) for every controller.</p>` }
  ],
  widget: 'TransferSim',
  answer: `<h3>Introduction</h3><p>A banking fund transfer must debit one account and credit another <b>atomically</b>. Using <b>Spring Boot</b> (IoC, web, transactions) with <b>Hibernate/JPA</b> (ORM), we build a layered application where <code>@Transactional</code> guarantees that either both updates succeed or both are rolled back.</p>
<h3>Transaction & ACID</h3><p>A transaction is a sequence of operations treated as one unit. <b>Atomicity</b>: all or none. <b>Consistency</b>: total money stays the same. <b>Isolation</b>: concurrent transfers don't interfere. <b>Durability</b>: committed data survives failures.</p>
<h3>Components</h3><ol>
<li><b>Entities</b>: <code>Customer</code> (id, name, <code>@OneToMany(mappedBy="customer") List&lt;Account&gt;</code>) and <code>Account</code> (id, balance, <code>@ManyToOne @JoinColumn(name="customer_id") Customer</code>).</li>
<li><b>Repository</b>: <code>AccountRepository extends JpaRepository&lt;Account, Long&gt;</code>.</li>
<li><b>Custom exception</b>: <code>InsufficientFundsException extends RuntimeException</code>.</li>
<li><b>Service</b>: <code>BankService.transfer(fromId, toId, amount)</code> annotated <b>@Transactional</b>: load accounts → check balance (throw exception if insufficient) → debit → credit → save.</li>
<li><b>Controller</b>: <code>@PostMapping("/transfer")</code> calls the service.</li>
<li><b>Global handler</b>: <code>@ControllerAdvice</code> class with <code>@ExceptionHandler</code> methods returning a JSON error response (timestamp, status, error, message).</li></ol>
<h3>How @Transactional works</h3><ul>
<li>Spring creates a <b>proxy</b> around the bean; before the method it <b>begins</b> a transaction, after it <b>commits</b>.</li>
<li>If a <b>RuntimeException</b> (unchecked) is thrown, it <b>rolls back</b> every change made in that method.</li>
<li>Attributes: <code>propagation</code> (default REQUIRED), <code>isolation</code>, <code>readOnly</code>, <code>rollbackFor</code>, <code>timeout</code>.</li></ul>
<h3>Proving rollback</h3><p>Throw an exception after debiting A (e.g. simulate a crash). Because the method is transactional, the debit is undone; balances are unchanged. Without @Transactional, A would lose money while B receives nothing.</p>
<h3>@ControllerAdvice & @ExceptionHandler</h3><p><code>@ControllerAdvice</code> applies exception handling across all controllers. <code>@ExceptionHandler(X.class)</code> marks a method that handles exception X and builds a custom response (e.g. 400 Bad Request with JSON). Benefits: centralised, consistent error format, clean controllers.</p>
<h3>Conclusion</h3><p>Spring's declarative transaction management + Hibernate ORM gives a safe, consistent fund transfer with very little code.</p>`,
  diagram: ` POST /api/bank/transfer?from=1&to=2&amount=500
        │
 BankController ──▶ BankService.transfer()  @Transactional ── BEGIN TX
                          │ 1. find both accounts (JpaRepository)
                          │ 2. balance < amount? ──yes──▶ throw InsufficientFundsException
                          │ 3. from.balance -= amount            │
                          │ 4. to.balance   += amount            ▼
                          ▼                                ROLLBACK (nothing saved)
                    COMMIT (both saved)                         │
                                                @ControllerAdvice → @ExceptionHandler
                                                → 400 {"error":"Insufficient Funds"}

 CUSTOMER (id, name) 1 ───< N  ACCOUNT (id, balance, customer_id FK)
        @OneToMany(mappedBy)          @ManyToOne @JoinColumn`,
  code: [{ t: 'Core of the 10-mark answer', src: String.raw`@Entity
public class Account {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double balance;
    @ManyToOne @JoinColumn(name = "customer_id")
    private Customer customer;
    // getters, setters
}

public interface AccountRepository extends JpaRepository<Account, Long> { }

public class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String msg) { super(msg); }
}

@Service
public class BankService {
    @Autowired private AccountRepository repo;

    @Transactional                                // all or nothing
    public void transfer(Long fromId, Long toId, double amount) {
        Account from = repo.findById(fromId).orElseThrow();
        Account to   = repo.findById(toId).orElseThrow();
        if (from.getBalance() < amount)
            throw new InsufficientFundsException("Insufficient balance");   // -> rollback
        from.setBalance(from.getBalance() - amount);
        // throw new RuntimeException("crash");   // uncomment to PROVE rollback
        to.setBalance(to.getBalance() + amount);
        repo.save(from);
        repo.save(to);
    }
}

@RestController @RequestMapping("/api/bank")
public class BankController {
    @Autowired private BankService service;
    @PostMapping("/transfer")
    public String transfer(@RequestParam Long from, @RequestParam Long to, @RequestParam double amount) {
        service.transfer(from, to, amount);
        return "Transfer successful";
    }
}

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(InsufficientFundsException.class)
    public ResponseEntity<Map<String, Object>> handle(InsufficientFundsException ex) {
        return ResponseEntity.badRequest().body(Map.of(
                "status", 400, "error", "Insufficient Funds", "message", ex.getMessage()));
    }
}`}],
  trick: `<b>ACID</b> = All-or-nothing, Correct total, Isolated, Durable.<br>@Transactional rolls back on <b>RuntimeException</b> by default. @ControllerAdvice = <b>one global catch block</b> for all controllers.`,
  quiz: [
    { q: 'By default @Transactional rolls back on…', o: ['Any exception', 'RuntimeException (unchecked)', 'Checked exceptions only', 'Never'], a: 1, why: 'Use rollbackFor for checked exceptions.' },
    { q: 'Atomicity means…', o: ['Fast execution', 'All operations succeed or none do', 'Data is encrypted', 'Only one user'], a: 1, why: 'The A in ACID.' },
    { q: 'Which annotation makes an exception handler global?', o: ['@Service', '@ControllerAdvice', '@Repository', '@Entity'], a: 1, why: '@ControllerAdvice applies to all controllers.' },
    { q: 'Account → Customer relationship is…', o: ['@OneToOne', '@ManyToOne', '@ManyToMany', '@OneToMany'], a: 1, why: 'Many accounts belong to one customer.' }
  ]
}
];

const cards = [
  [3, 'Define IoC', 'Control of object creation & lifecycle is given to the Spring container instead of the programmer.'],
  [3, 'Define DI + 3 types', 'Container supplies dependencies from outside. Constructor (recommended), Setter (optional), Field.'],
  [3, 'BeanFactory vs ApplicationContext', 'Basic, lazy container vs advanced, eager container (events, AOP). Spring Boot uses ApplicationContext.'],
  [3, 'Bean lifecycle', 'Instantiate → inject → @PostConstruct → ready → @PreDestroy.'],
  [3, '@Component vs @Service vs @Repository', 'All register beans. Service = business layer. Repository = DAO + DB exception translation.'],
  [3, '@Component vs @Bean', '@Component on a class (auto-scanned). @Bean on a method in @Configuration (manual, third-party classes).'],
  [3, '@Entity and @Table', '@Entity marks a class mapped to a DB table. @Table(name) sets the table name.'],
  [3, '@Id and @GeneratedValue', 'Primary key; auto-generated (IDENTITY = auto-increment).'],
  [3, 'Where does the FK go in One-to-Many?', 'On the "many" side (@ManyToOne + @JoinColumn). The one side uses mappedBy.'],
  [3, '@ManyToMany needs…', 'A join table (@JoinTable) holding two foreign keys.'],
  [3, 'What is REST?', 'Architecture where resources (URIs) are manipulated with HTTP methods; stateless, uses JSON.'],
  [3, 'CRUD ↔ HTTP', 'Create POST · Read GET · Update PUT · Delete DELETE.'],
  [3, '@PathVariable vs @RequestBody', 'PathVariable: value from URL (/students/{id}). RequestBody: JSON body → Java object.'],
  [3, 'Status codes', '200 OK · 201 Created · 204 No Content · 400 Bad Request · 404 Not Found · 500 Server Error.'],
  [3, 'RestTemplate vs WebClient', 'Synchronous blocking client vs non-blocking reactive client.'],
  [3, 'Singleton recipe', 'Private constructor + private static instance + public static getInstance().'],
  [3, 'Creational vs Behavioral', 'Creational: object creation (Singleton, Factory). Behavioral: object communication (Observer, Strategy).'],
  [3, 'Observer pattern', 'One-to-many: subject notifies all subscribed observers on change.'],
  [3, 'Strategy pattern', 'Interchangeable algorithms behind one interface, chosen at runtime.'],
  [3, 'Servlet lifecycle', 'init() once → service() per request (doGet/doPost) → destroy() once.'],
  [3, 'HttpServletRequest (function)', 'Carries the client request; getParameter() reads form input; also headers, session.'],
  [3, 'HttpServletResponse (function)', 'Sends output: setContentType(), getWriter(), sendRedirect().'],
  [3, 'Layered architecture', 'Controller (@RestController) → Service (@Service) → Repository (@Repository) → DB via Hibernate.'],
  [3, 'JSP components', 'Directive &lt;%@ %&gt;, Scriptlet &lt;% %&gt;, Expression &lt;%= %&gt;, Declaration &lt;%! %&gt;, Action &lt;jsp:include&gt;, EL $&#123;&#125;.'],
  [3, 'Include directive vs include action', 'Directive: static, at translation time. Action: dynamic, at request time.'],
  [3, 'JSP lifecycle', 'Translate → compile → jspInit() → _jspService() → jspDestroy().'],
  [3, 'ACID', 'Atomicity, Consistency, Isolation, Durability.'],
  [3, '@Transactional rollback rule', 'Rolls back on RuntimeException by default; use rollbackFor for checked.'],
  [3, '@ControllerAdvice + @ExceptionHandler', 'Global exception handling for all controllers; returns custom JSON error responses.']
];

export default { topics, cards };
