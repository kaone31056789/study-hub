// "Start here": Java from zero, in everyday language, plus a jargon glossary.
export const basicsTopic = {
  id: 'u0-basics', unit: 0, title: 'Java Basics in 15 Minutes (start here)', marks: 'foundation', mins: 15,
  q: 'Not an exam question. Read this first so every other topic makes sense.',
  simple: `<p>Java is a language for giving instructions to a computer. Everything in Java is built from <b>classes</b> and <b>objects</b>, the same way a city is built from <b>blueprints</b> and <b>houses</b>.</p>
<ul><li><b>Class</b> = a blueprint ("what a Student looks like").</li><li><b>Object</b> = a real thing made from the blueprint ("Asha, roll 101").</li><li><b>Method</b> = something the object can do ("printDetails()").</li></ul><p>That's 80% of Java. The rest is rules on top of this.</p>`,
  learn: [
    { title: 'Class', body: `<p>A <b>class</b> is a blueprint. It says what data a thing has and what it can do.</p><pre>class Student {\n    String name;      // data (a "field")\n    int roll;\n    void study() { }  // action (a "method")\n}</pre>` },
    { title: 'Object', body: `<p>An <b>object</b> is a real copy made from the class with <code>new</code>.</p><pre>Student s = new Student();\ns.name = "Asha";\ns.study();</pre><p>One class → many objects (like one house plan → many houses).</p>` },
    { title: 'Variable & type', body: `<p>A <b>variable</b> is a labelled box that stores a value. Its <b>type</b> says what can go inside:</p><p><code>int</code> whole number · <code>double</code> decimal · <code>char</code> one letter · <code>boolean</code> true/false · <code>String</code> text.</p>` },
    { title: 'Method', body: `<p>A <b>method</b> is a named set of steps. It can take inputs (<b>parameters</b>) and give back an output (<b>return value</b>).</p><pre>int add(int a, int b) {\n    return a + b;\n}</pre>` },
    { title: 'main()', body: `<p>Every Java program starts running from <code>public static void main(String[] args)</code>. Think of it as the <b>front door</b>.</p><p><code>System.out.println("Hi");</code> prints text on the screen.</p>` },
    { title: 'Constructor', body: `<p>A <b>constructor</b> is a special method with the <b>same name as the class</b> that runs automatically when you create an object. It's used to set starting values.</p><pre>Student(String n) { name = n; }</pre>` },
    { title: 'Interface & abstract', body: `<p>An <b>interface</b> is a promise list ("anything that is Printable must have print()"). An <b>abstract</b> class is a half-finished blueprint that other classes complete.</p>` },
    { title: 'Package & import', body: `<p>A <b>package</b> is a folder of related classes (<code>java.util</code>). <code>import java.util.*;</code> lets you use them.</p>` },
    { title: 'Annotation (@)', body: `<p>Words starting with <b>@</b> (like <code>@Override</code>, <code>@Service</code>) are <b>labels</b> that give extra instructions to Java or Spring. They don't do the work themselves; they tell the framework what to do.</p>` },
    { title: 'Big picture', body: `<p><b>Unit 1</b>: core Java rules (classes, OOP, errors).<br><b>Unit 2</b>: tools to store data and do many things at once (collections, threads, files, database).<br><b>Unit 3</b>: building websites & web services with Spring (a framework that does the boring work for you).</p>` }
  ],
  explore: [
    { k: 'class', h: '<p><b>Blueprint.</b> Describes fields (data) and methods (actions). Nothing exists until you create an object.</p>' },
    { k: 'object', h: '<p><b>A real thing made from a class</b> using <code>new</code>. Lives in memory (the heap).</p>' },
    { k: 'method', h: '<p><b>An action.</b> A block of code with a name; can take parameters and return a value.</p>' },
    { k: 'static', h: '<p><b>Belongs to the class, not to each object.</b> You can call it without creating an object, like <code>Math.sqrt(9)</code>.</p>' },
    { k: 'void', h: '<p>The method <b>returns nothing</b>.</p>' },
    { k: 'public / private', h: '<p><b>Who is allowed to use it.</b> public = everyone, private = only inside this class.</p>' },
    { k: 'extends', h: '<p><b>"is a kind of".</b> <code>Dog extends Animal</code>: Dog gets everything Animal has.</p>' },
    { k: 'implements', h: '<p><b>"keeps the promise of".</b> A class implementing an interface must write all its methods.</p>' },
    { k: 'new', h: '<p><b>Creates an object</b> from a class.</p>' },
    { k: 'this / super', h: '<p><b>this</b> = the current object. <b>super</b> = the parent class.</p>' },
    { k: 'null', h: '<p><b>"Nothing here."</b> A variable that points to no object. Using it causes NullPointerException.</p>' },
    { k: 'framework', h: '<p><b>Ready-made skeleton code</b> (like Spring) that handles common work so you write only the important parts.</p>' }
  ],
  exploreTitle: 'Tap a keyword to see what it means',
  answer: `<h3>Structure of a Java program</h3><ol><li><b>Package</b> (optional): the folder the class lives in.</li><li><b>Imports</b>: other classes you want to use.</li><li><b>Class</b>: fields + constructors + methods.</li><li><b>main()</b>: where execution starts.</li></ol>
<h3>How to read any code in this course</h3><ul><li>Lines starting with <code>@</code> → labels for Spring/Java.</li><li><code>class X extends Y</code> → X is a kind of Y.</li><li><code>X x = new X();</code> → create an object.</li><li><code>x.method()</code> → ask the object to do something.</li><li><code>// text</code> → a comment for humans; Java ignores it.</li></ul>
<p>You don't need to memorise syntax for a theory exam. Understand the <b>idea</b>, learn the <b>keywords</b>, and write the <b>key lines</b> of each program.</p>`,
  code: [{ t: 'A complete tiny program, every line explained', src: String.raw`public class Student {                 // blueprint called Student
    String name;                        // field: data each student has
    int marks;

    Student(String name, int marks) {   // constructor: runs on "new"
        this.name = name;
        this.marks = marks;
    }

    boolean hasPassed() {               // method: returns true/false
        return marks >= 40;
    }

    public static void main(String[] args) {    // program starts here
        Student s = new Student("Asha", 82);     // create an object
        System.out.println(s.name + " passed? " + s.hasPassed());   // Asha passed? true
    }
}`}],
  trick: `<b>Class = blueprint, Object = house, Method = what the house can do.</b> If you remember only one thing, remember this.`,
  quiz: [
    { q: 'A class is best described as…', o: ['A real object in memory', 'A blueprint for objects', 'A variable', 'A loop'], a: 1, why: 'Objects are created from classes with new.' },
    { q: 'Which keyword creates an object?', o: ['class', 'new', 'static', 'void'], a: 1, why: '<code>new Student()</code> creates an object.' },
    { q: 'Where does a Java program start running?', o: ['The first class', 'main()', 'The constructor', 'import'], a: 1, why: 'public static void main(String[] args) is the entry point.' }
  ]
};

export const basicsCards = [
  [0, 'Class vs Object', 'Class = blueprint. Object = real thing made from it with <code>new</code>.'],
  [0, 'What is a method?', 'A named block of steps an object can perform; may take inputs and return a value.'],
  [0, 'What is a constructor?', 'Special method with the class name; runs automatically when an object is created.'],
  [0, 'What does @ mean (e.g. @Override)?', 'An annotation, a label that gives instructions to Java or a framework like Spring.'],
  [0, 'static means…', 'Belongs to the class itself, not to each object.']
];

// Jargon buster: [term, plain meaning]
export const glossary = [
  ['Annotation (@…)', 'A label on code that tells Java/Spring to do something extra.'],
  ['API', 'A ready-made set of functions you can call, like a menu of services.'],
  ['Bean', 'An object that Spring creates and manages for you.'],
  ['Bytecode', 'The in-between code (.class) that javac makes and the JVM runs.'],
  ['Checked exception', 'An error Java forces you to handle before the program compiles.'],
  ['Class', 'A blueprint that describes data + actions.'],
  ['Collection', 'A container that holds many objects (list, set, queue).'],
  ['Compile time', 'When javac turns your code into bytecode, before running.'],
  ['Constructor', 'Code that runs automatically when an object is created.'],
  ['CRUD', 'Create, Read, Update, Delete: the 4 basic data operations.'],
  ['Dependency', 'Another object your object needs to work (a Car needs an Engine).'],
  ['Dependency Injection', 'Someone else (Spring) hands you the objects you need.'],
  ['Entity', 'A Java class that maps to a database table.'],
  ['Exception', 'An error that happens while the program runs.'],
  ['Foreign key (FK)', 'A column that points to a row in another table.'],
  ['Framework', 'Pre-built code that does common work so you only write your part (Spring).'],
  ['Hibernate', 'A tool that turns Java objects into database rows and back (ORM).'],
  ['HTTP method', 'The action in a web request: GET, POST, PUT, DELETE.'],
  ['Inheritance', 'A child class gets the features of a parent class (extends).'],
  ['Interface', 'A list of methods a class promises to have.'],
  ['IoC', 'Spring creates and connects your objects instead of you.'],
  ['JDBC', 'Java\'s way of talking to a database.'],
  ['JSON', 'A simple text format for data: {"name": "Asha"}.'],
  ['JSP', 'An HTML page with small bits of Java, run on a server.'],
  ['JVM', 'The program that runs Java bytecode on your computer.'],
  ['Lambda', 'A short nameless function: (a, b) -> a + b.'],
  ['Method', 'A named action an object can perform.'],
  ['Object', 'A real thing created from a class.'],
  ['ORM', 'Object-Relational Mapping: objects ⇄ database tables automatically.'],
  ['Overloading', 'Same method name, different inputs (decided while compiling).'],
  ['Overriding', 'Child class rewrites a parent\'s method (decided while running).'],
  ['Primary key (PK)', 'A column that uniquely identifies each row (like a roll number).'],
  ['REST API', 'A way for programs to talk over the web using URLs + HTTP methods + JSON.'],
  ['Runtime', 'While the program is actually running.'],
  ['Serialization', 'Turning an object into bytes to save it in a file.'],
  ['Servlet', 'A Java class on a web server that answers browser requests.'],
  ['Stream (Java 8)', 'A pipeline to filter/transform a list of data step by step.'],
  ['Thread', 'One path of execution. Many threads = doing many things at once.'],
  ['Transaction', 'A group of database steps that all succeed or all get cancelled.']
];
