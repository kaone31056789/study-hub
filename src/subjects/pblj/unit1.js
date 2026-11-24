// Unit 1 · Core Java. HTML strings are trusted local content. Code uses String.raw so backslashes stay literal.
const topics = [
{
  id: 'u1-jvm', unit: 1, title: 'Java Features, Bytecode & JVM / JRE / JDK', marks: '2 / 10', mins: 20, pyq: 'Q1 · 2M', imp: true,
  q: 'Explain the features of Java and the architecture of JVM, JRE and JDK with a diagram. <i>(Last year, 2M: Describe the bytecode concept and its relevance to the JVM.)</i>',
  simple: `<p>Imagine recording a movie in one universal format. Every device (Windows, Mac, Linux) has its own <b>player</b> that can play that format. Record once, play anywhere.</p>
<ul><li><b>Bytecode (.class)</b> = the universal movie file, made by <code>javac</code>.</li>
<li><b>JVM</b> = the player. Each OS has its own, but all understand the same bytecode.</li>
<li><b>JRE</b> = player + libraries → enough to <i>run</i> Java.</li>
<li><b>JDK</b> = JRE + tools (compiler…) → needed to <i>write</i> Java.</li></ul>`,
  learn: [
    { title: 'Source', body: `<p>You write <code>Hello.java</code>, plain text code that humans can read. The computer can't run it directly.</p>` },
    { title: 'Compile', body: `<p><code>javac Hello.java</code> converts it into <b>bytecode</b> stored in <code>Hello.class</code>.</p><p>Bytecode is <b>not</b> machine code for Intel/ARM. It's machine code for an imaginary computer: the <b>Java Virtual Machine</b>.</p>` },
    { title: 'Load & verify', body: `<p><code>java Hello</code> starts the JVM. The <b>Class Loader</b> loads the .class file and the <b>Bytecode Verifier</b> checks it's safe (no illegal memory access). That's part of Java's <b>security</b>.</p>` },
    { title: 'Execute', body: `<p>The <b>Execution Engine</b> runs it. The <b>Interpreter</b> goes line by line; the <b>JIT compiler</b> turns frequently-used code into native code for <b>speed</b>. The <b>Garbage Collector</b> frees unused objects.</p>` },
    { title: 'Anywhere', body: `<p>Windows, Linux and Mac each have their own JVM, but the <b>same .class file</b> runs on all of them. That's <b>platform independence</b>: Write Once, Run Anywhere (WORA).</p>` }
  ],
  widget: 'JvmFlow',
  short: `<p><b>Bytecode</b> is the intermediate, platform-independent code (stored in a <code>.class</code> file) that the Java compiler <code>javac</code> produces from source code. It is not tied to any processor or OS.</p>
<p><b>Relevance to JVM:</b> the JVM loads and <b>verifies</b> the bytecode, then <b>interprets / JIT-compiles</b> it into the native machine code of that system. Since every OS has its own JVM that understands the same bytecode, one .class file runs everywhere. This makes Java <b>platform independent (WORA)</b> and secure.</p>`,
  answer: `<h3>Features of Java (write any 8)</h3><ol>
<li><b>Simple</b>: C++-like syntax without pointers, operator overloading or multiple inheritance of classes.</li>
<li><b>Object-Oriented</b>: everything is organised into classes and objects.</li>
<li><b>Platform Independent</b>: compiled to bytecode which runs on any JVM (WORA).</li>
<li><b>Secure</b>: no explicit pointers, bytecode verifier, runs inside the JVM sandbox.</li>
<li><b>Robust</b>: strong type checking, automatic garbage collection, exception handling.</li>
<li><b>Multithreaded</b>: built-in support for running many threads at once.</li>
<li><b>Architecture-neutral & Portable</b>: data type sizes are fixed (int = 4 bytes everywhere).</li>
<li><b>High Performance</b>: JIT compiler converts hot bytecode to native code.</li>
<li><b>Distributed & Dynamic</b>: networking support (RMI, sockets); classes loaded at runtime.</li></ol>
<h3>JDK vs JRE vs JVM</h3>
<table class="tbl"><tr><th></th><th>JDK</th><th>JRE</th><th>JVM</th></tr>
<tr><td>Full form</td><td>Java Development Kit</td><td>Java Runtime Environment</td><td>Java Virtual Machine</td></tr>
<tr><td>Contains</td><td>JRE + dev tools (javac, javadoc, jar, jdb)</td><td>JVM + core libraries</td><td>Class loader, memory areas, execution engine</td></tr>
<tr><td>Used to</td><td>Develop and run</td><td>Only run</td><td>Execute bytecode</td></tr></table>
<p><b>JDK = JRE + Development Tools</b>, &nbsp; <b>JRE = JVM + Library classes</b>.</p>
<h3>Architecture of JVM</h3><ol>
<li><b>Class Loader Subsystem</b>: <i>Loading</i> (Bootstrap → Platform → Application class loader), <i>Linking</i> (Verify, Prepare, Resolve), <i>Initialization</i> (static blocks run).</li>
<li><b>Runtime Data Areas</b>:<ul>
<li><b>Method Area</b>: class code, metadata, static variables (shared by all threads).</li>
<li><b>Heap</b>: all objects and arrays (shared; cleaned by GC).</li>
<li><b>Java Stack</b>: one per thread; one frame per method call (local variables).</li>
<li><b>PC Register</b>: one per thread; address of the current instruction.</li>
<li><b>Native Method Stack</b>: for native (C/C++) methods.</li></ul></li>
<li><b>Execution Engine</b>: Interpreter, JIT Compiler, Garbage Collector.</li>
<li><b>JNI & Native Libraries</b>: let Java call C/C++ code.</li></ol>
<p><b>Conclusion:</b> javac produces bytecode, and the JVM makes that bytecode run on any platform. That is the core idea behind Java.</p>`,
  diagram: ` ┌──────────────────────── JDK ─────────────────────────┐
 │  javac  javadoc  jar  jdb        (development tools)  │
 │  ┌───────────────────── JRE ──────────────────────┐   │
 │  │  Core libraries: java.lang, java.util, java.io │   │
 │  │  ┌──────────────────── JVM ────────────────┐   │   │
 │  │  │ Class Loader → Memory → Execution Engine │   │   │
 │  │  └─────────────────────────────────────────┘   │   │
 │  └────────────────────────────────────────────────┘   │
 └───────────────────────────────────────────────────────┘

 Hello.java ──javac──▶ Hello.class (BYTECODE) ──▶ JVM ──▶ machine code
                            │
            ┌───────────────┼───────────────┐
       Windows JVM      Linux JVM        Mac JVM      (same .class runs on all)

 JVM ARCHITECTURE
 ┌──────────────────────────────────────────────────┐
 │ CLASS LOADER SUBSYSTEM                           │
 │   Loading → Linking (verify/prepare/resolve)     │
 │           → Initialization                       │
 ├──────────────────────────────────────────────────┤
 │ RUNTIME DATA AREAS                               │
 │  [Method Area] [Heap]          ← shared          │
 │  [Java Stack] [PC Reg] [Native Stack] ← per thread│
 ├──────────────────────────────────────────────────┤
 │ EXECUTION ENGINE: Interpreter | JIT | GC         │
 └───────────────────────┬──────────────────────────┘
                         │ JNI
               Native Method Libraries`,
  code: [{ t: 'Compile once, run anywhere', src: String.raw`public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, JVM!");
    }
}
// javac Hello.java   -> Hello.class (bytecode)
// java Hello         -> JVM loads, verifies & executes it`}],
  trick: `<b>JDK ⊃ JRE ⊃ JVM</b>: the Developer Kit holds the Runtime, which holds the Virtual machine.<br>JVM memory: <b>"My Heap Stacks PC Natively"</b> = Method area, Heap, Stack, PC register, Native stack.`,
  quiz: [
    { q: 'What does <code>javac</code> produce?', o: ['.java file', '.class file containing bytecode', '.exe file', 'Native machine code'], a: 1, why: 'javac compiles source into platform-independent bytecode stored in .class files.' },
    { q: 'Which is enough to only RUN a Java program?', o: ['JDK', 'JRE', 'javac', 'javadoc'], a: 1, why: 'JRE = JVM + libraries. The JDK adds development tools.' },
    { q: 'Where are objects stored in JVM memory?', o: ['Stack', 'PC Register', 'Heap', 'Method Area'], a: 2, why: 'All objects and arrays live in the Heap. Stack frames hold local variables and references.' },
    { q: 'Which part converts frequently-used bytecode into native code for speed?', o: ['Class Loader', 'JIT Compiler', 'Garbage Collector', 'Verifier'], a: 1, why: 'The Just-In-Time compiler in the execution engine.' }
  ]
},
{
  id: 'u1-oop', unit: 1, title: 'Four Pillars of OOP', marks: '10', mins: 25, imp: true,
  q: 'Explain the four pillars of OOP (Inheritance, Encapsulation, Abstraction, Polymorphism) with Java programs.',
  simple: `<p>Think of a <b>car</b>:</p><ul>
<li><b>Encapsulation</b>: the engine is sealed under the bonnet; you can only use it through controls (private data + public methods).</li>
<li><b>Abstraction</b>: you press start without knowing how fuel injection works (show what, hide how).</li>
<li><b>Inheritance</b>: a SportsCar <i>is a</i> Car, so it gets everything a Car has (reuse).</li>
<li><b>Polymorphism</b>: "horn()" sounds different on a car, bike and truck (one name, many forms).</li></ul>`,
  learn: [
    { title: 'Encapsulation', body: `<p>Wrap data + methods into one class and make the data <code>private</code>. Others access it only through public <b>getters/setters</b>, which can <b>validate</b>. Result: <b>data hiding</b>.</p>` },
    { title: 'Abstraction', body: `<p>Hide implementation details and show only essential features. Achieved with <b>abstract classes</b> (0–100%) and <b>interfaces</b> (100%). The user knows <i>what</i> <code>calculateSalary()</code> does, not <i>how</i>.</p>` },
    { title: 'Inheritance', body: `<p>A child class acquires the fields and methods of a parent using <code>extends</code>. This is the <b>IS-A</b> relationship. Gives <b>reusability</b> and enables overriding. <code>super</code> calls the parent.</p>` },
    { title: 'Polymorphism', body: `<p>One name, many forms.</p><ul><li><b>Compile-time</b>: method <b>overloading</b> (same name, different parameters).</li><li><b>Runtime</b>: method <b>overriding</b> (child redefines parent method; the JVM picks by the actual object).</li></ul>` }
  ],
  widget: 'OopPillars',
  answer: `<p><b>Object-Oriented Programming</b> organises a program around <b>objects</b> that combine data (fields) and behaviour (methods). Java rests on four pillars:</p>
<h3>1. Encapsulation</h3><p>Binding data and the methods that operate on it into a single unit (class), and restricting direct access to the data using <code>private</code>. Access is provided through public getter/setter methods which can validate input. <b>Benefit:</b> data hiding, security, control over data.</p>
<h3>2. Abstraction</h3><p>Hiding internal implementation and showing only the functionality. Achieved through <b>abstract classes</b> (can have abstract + concrete methods) and <b>interfaces</b> (contract of methods). <b>Benefit:</b> reduces complexity, separates "what" from "how".</p>
<h3>3. Inheritance</h3><p>The mechanism by which one class (subclass) acquires the properties and behaviours of another (superclass) using <code>extends</code>. Represents an IS-A relationship. <b>Benefit:</b> code reusability, method overriding, hierarchical classification.</p>
<h3>4. Polymorphism</h3><p>The ability of one entity to take many forms.</p><ul><li><b>Compile-time (static)</b>: method overloading. Resolved by the compiler.</li><li><b>Runtime (dynamic)</b>: method overriding. A parent reference holds a child object, and the JVM calls the child's version at runtime.</li></ul>
<h3>Abstract class vs Interface</h3>
<table class="tbl"><tr><th>Abstract class</th><th>Interface</th></tr>
<tr><td>Abstract + concrete methods</td><td>Abstract methods (+ default/static since Java 8)</td></tr>
<tr><td>Any variables</td><td>Only public static final constants</td></tr>
<tr><td>Has constructors</td><td>No constructors</td></tr>
<tr><td>A class extends only one</td><td>A class can implement many</td></tr>
<tr><td>Keyword: <code>abstract class</code>, <code>extends</code></td><td>Keyword: <code>interface</code>, <code>implements</code></td></tr></table>
<h3>Advantages of OOP</h3><p>Reusability, data security, easy maintenance and modification, real-world modelling, flexibility through polymorphism.</p>`,
  diagram: `                          OOP
       ┌─────────────┬───────┴──────┬──────────────┐
 ENCAPSULATION   ABSTRACTION   INHERITANCE   POLYMORPHISM
 private data +  abstract class  extends      overloading (compile)
 getters/setters  interface      IS-A, super  overriding  (runtime)

          abstract class Employee          ← Abstraction
          - id, name   (private)           ← Encapsulation
          + abstract calculateSalary()
               ▲                 ▲
   FullTimeEmployee       PartTimeEmployee  ← Inheritance
   calculateSalary()      calculateSalary() ← Overriding (Polymorphism)`,
  code: [{ t: 'All four pillars in one short program', src: String.raw`abstract class Employee {                 // ABSTRACTION
    private String name;                  // ENCAPSULATION (private data)
    Employee(String name) { this.name = name; }
    public String getName() { return name; }      // getter
    abstract double calculateSalary();    // what, not how
}

class FullTime extends Employee {         // INHERITANCE
    private double monthly;
    FullTime(String n, double m) { super(n); monthly = m; }
    @Override
    double calculateSalary() { return monthly; }        // OVERRIDING
}

class PartTime extends Employee {
    private int hours; private double rate;
    PartTime(String n, int h, double r) { super(n); hours = h; rate = r; }
    @Override
    double calculateSalary() { return hours * rate; }
}

public class Payroll {
    static double bonus(double s)            { return s * 0.10; }   // OVERLOADING
    static double bonus(double s, double p)  { return s * p / 100; }

    public static void main(String[] args) {
        Employee e = new FullTime("Asha", 50000);   // POLYMORPHISM: parent ref, child object
        System.out.println(e.getName() + " " + e.calculateSalary());   // 50000.0
        e = new PartTime("Ravi", 80, 300);
        System.out.println(e.getName() + " " + e.calculateSalary());   // 24000.0
        System.out.println(bonus(50000) + " " + bonus(24000, 5));      // 5000.0 1200.0
    }
}`}],
  trick: `<b>"A PIE"</b> = Abstraction, Polymorphism, Inheritance, Encapsulation.<br>Encapsulation = <b>capsule</b> (wrap + hide). Abstraction = <b>hide how</b>. Inheritance = <b>IS-A</b>. Polymorphism = <b>many forms</b>.`,
  quiz: [
    { q: 'Making fields <code>private</code> and exposing getters/setters is…', o: ['Abstraction', 'Encapsulation', 'Inheritance', 'Polymorphism'], a: 1, why: 'Encapsulation = data hiding + controlled access.' },
    { q: 'Method overriding is an example of…', o: ['Compile-time polymorphism', 'Runtime polymorphism', 'Encapsulation', 'Abstraction only'], a: 1, why: 'The JVM decides which overridden method to run based on the actual object at runtime.' },
    { q: 'Which can have a constructor?', o: ['Interface', 'Abstract class', 'Both', 'Neither'], a: 1, why: 'Abstract classes have constructors (called via super from subclasses); interfaces do not.' }
  ]
},
{
  id: 'u1-inherit', unit: 1, title: 'Types of Inheritance & Multiple Inheritance', marks: '10', mins: 15, imp: true,
  q: 'Explain the types of inheritance in Java with examples. How does Java achieve multiple inheritance?',
  simple: `<p>Inheritance is a <b>family tree</b> for classes. A child gets everything from its parent. Java allows one parent per class (to avoid confusion), but a class can sign <b>many contracts</b> (interfaces). That's how Java does multiple inheritance safely.</p>`,
  learn: [
    { title: 'Single', body: `<p><code>class B extends A</code>: one parent, one child.</p>` },
    { title: 'Multilevel', body: `<p><code>C extends B</code>, <code>B extends A</code>: a chain. C gets members of both B and A (grandparent).</p>` },
    { title: 'Hierarchical', body: `<p><code>B extends A</code> and <code>C extends A</code>: one parent, many children.</p>` },
    { title: 'Multiple', body: `<p>One child with two parent <b>classes</b> is <b>NOT allowed</b> because of the <b>Diamond Problem</b>: if both parents have <code>show()</code>, which one does the child get? Ambiguous → compile error.</p>` },
    { title: 'The fix', body: `<p>Use <b>interfaces</b>: <code>class C implements A, B</code>. Interfaces only declare methods, so there's no conflicting code. If two interfaces have the same <code>default</code> method, the class must override it and can pick one with <code>A.super.show()</code>.</p>` }
  ],
  explore: [
    { k: 'Single', h: `<pre>  A\n  ▲\n  B          class B extends A</pre><p>Dog extends Animal.</p>` },
    { k: 'Multilevel', h: `<pre>  A\n  ▲\n  B\n  ▲\n  C          class C extends B; class B extends A</pre><p>Puppy → Dog → Animal. Puppy can call eat() from Animal.</p>` },
    { k: 'Hierarchical', h: `<pre>      A\n    ▲   ▲\n    B   C    both extend A</pre><p>Dog and Cat both extend Animal.</p>` },
    { k: 'Multiple ✗ (classes)', h: `<pre>    A     B        both have show()\n     ▲   ▲\n       C          class C extends A, B  ✗ ERROR</pre><p><b>Diamond problem:</b> C would inherit two show() methods, so the call is ambiguous. Java forbids it for classes.</p>` },
    { k: 'Multiple ✓ (interfaces)', h: `<pre>  «A»   «B»       interfaces\n    ▲   ▲\n      C           class C implements A, B  ✓</pre><p>No ambiguity: C itself writes the method body.</p>` },
    { k: 'Hybrid', h: `<p>A mix of two or more types (e.g. hierarchical + multiple). In Java it's possible only <b>through interfaces</b>.</p>` }
  ],
  exploreTitle: 'Tap each type',
  answer: `<p><b>Inheritance</b> is the mechanism where one class acquires the properties (fields) and behaviours (methods) of another class using the <code>extends</code> keyword. The parent is the <b>superclass</b>, the child the <b>subclass</b>. It represents an <b>IS-A</b> relationship and promotes code reusability. <code>java.lang.Object</code> is the root of all classes.</p>
<h3>Types of Inheritance</h3><ol>
<li><b>Single</b>: one subclass inherits one superclass. <code>class Dog extends Animal</code>.</li>
<li><b>Multilevel</b>: a chain: C extends B, B extends A. C inherits from both.</li>
<li><b>Hierarchical</b>: multiple subclasses inherit the same superclass.</li>
<li><b>Multiple</b>: one class inherits from more than one class. <b>Not supported with classes</b> in Java.</li>
<li><b>Hybrid</b>: combination of the above; achieved using interfaces.</li></ol>
<h3>Why not multiple inheritance with classes? (Diamond Problem)</h3>
<p>If classes B and C both inherit from A and override <code>show()</code>, and D extends both B and C, then <code>d.show()</code> is ambiguous: the compiler cannot decide which version to use. To keep the language simple and unambiguous, Java does not allow a class to extend more than one class.</p>
<h3>How Java achieves multiple inheritance</h3>
<p>Through <b>interfaces</b>. A class can <code>implements</code> any number of interfaces: <code>class C implements A, B</code>. Since interfaces only declare methods (no state), the implementing class supplies the body, so there is no ambiguity. If two interfaces have the same <code>default</code> method, the class must override it and may call a specific one using <code>A.super.method()</code>.</p>
<h3>Advantages</h3><p>Code reusability, method overriding (runtime polymorphism), extensibility, logical hierarchy.</p>`,
  diagram: ` SINGLE     MULTILEVEL    HIERARCHICAL     MULTIPLE (interfaces only)   HYBRID
   A           A              A            «A»    «B»                    A
   ▲           ▲            ▲   ▲            ▲    ▲                    ▲   ▲
   B           B            B   C              C                       B   C
               ▲                                                       ▲   ▲
               C                     DIAMOND PROBLEM (classes ✗)        «D»
                                           A
                                         ▲   ▲
                                         B   C    both override show()
                                         ▲   ▲
                                           D      d.show() → which one? ✗`,
  code: [{ t: 'Multiple inheritance via interfaces', src: String.raw`interface Printable { void print(); }
interface Showable  { void show();  }

class Document implements Printable, Showable {     // multiple inheritance
    public void print() { System.out.println("Printing"); }
    public void show()  { System.out.println("Showing"); }
}

interface A { default void hello() { System.out.println("A"); } }
interface B { default void hello() { System.out.println("B"); } }
class C implements A, B {
    public void hello() { A.super.hello(); }       // resolve the conflict
}`}],
  trick: `<b>"SMH-MH"</b>: Single, Multilevel, Hierarchical (classes ✓) · Multiple, Hybrid (interfaces only).<br>Diamond problem = <b>two parents, same method, confused child</b>.`,
  quiz: [
    { q: 'Why doesn\'t Java allow multiple inheritance with classes?', o: ['Performance', 'Diamond problem / ambiguity', 'Memory limits', 'Security'], a: 1, why: 'Two parents with the same method make the call ambiguous.' },
    { q: '<code>class C extends B</code>, <code>class B extends A</code> is…', o: ['Single', 'Multilevel', 'Hierarchical', 'Hybrid'], a: 1, why: 'A chain of inheritance = multilevel.' },
    { q: 'How does a class achieve multiple inheritance?', o: ['extends A, B', 'implements A, B', 'super A, B', 'It cannot'], a: 1, why: 'A class can implement any number of interfaces.' }
  ]
},
{
  id: 'u1-overload', unit: 1, title: 'Method Overloading vs Overriding', marks: '5', mins: 15, pyq: 'Q6 · 5M', imp: true,
  q: 'Write a Java program that demonstrates method overloading. Explain how the compiler distinguishes between overloaded methods. Differentiate overloading and overriding.',
  simple: `<p><b>Overloading</b> = one shop called <i>"add"</i> with different counters: one takes 2 numbers, one takes 3, one takes decimals. The <b>compiler</b> sends you to the right counter by looking at what you're carrying (your arguments).</p>
<p><b>Overriding</b> = a son rewrites his father's recipe with the <i>same name</i>. Whose recipe gets cooked depends on <b>who is actually in the kitchen</b> (the real object), decided at <b>runtime</b>.</p>`,
  learn: [
    { title: 'Overloading', body: `<p>Same method name, <b>same class</b>, but <b>different parameter list</b>: number, type or order of parameters.</p><p><code>add(int,int)</code>, <code>add(int,int,int)</code>, <code>add(double,double)</code></p>` },
    { title: 'How compiler picks', body: `<p>At <b>compile time</b> the compiler matches the call's arguments against each method's <b>signature</b> (name + parameter types/number/order). The best match wins. This is <b>static / early binding</b>.</p><p>⚠ Return type alone can't distinguish overloads.</p>` },
    { title: 'Overriding', body: `<p>A <b>subclass</b> redefines a method of its parent with the <b>exact same signature</b> (and same or covariant return type). Needs inheritance. Mark it with <code>@Override</code>.</p>` },
    { title: 'How JVM picks', body: `<p><code>Animal a = new Dog(); a.sound();</code></p><p>The compiler only checks that <code>sound()</code> exists in Animal. At <b>runtime</b> the JVM looks at the real object (Dog) and runs <code>Dog.sound()</code>. This is <b>dynamic method dispatch / late binding</b>.</p>` }
  ],
  widget: 'OverloadResolver',
  answer: `<h3>Method Overloading</h3><p>Defining multiple methods with the <b>same name</b> in the <b>same class</b> but with a <b>different parameter list</b> (number, type or order of parameters). It is <b>compile-time polymorphism</b>.</p>
<h3>How the compiler distinguishes overloaded methods</h3><ol>
<li>It looks at the <b>method signature</b> = method name + parameter list.</li>
<li>It compares the <b>number</b> of arguments in the call.</li>
<li>Then the <b>data types</b> of the arguments (with widening such as int → long → double if no exact match).</li>
<li>Then the <b>order</b> of the parameter types.</li>
<li>The most specific match is bound <b>at compile time</b> (static binding). <b>Return type is not considered</b>; two methods differing only in return type give a compile error.</li></ol>
<h3>Method Overriding</h3><p>A subclass provides its own implementation of a method already defined in its superclass, with the <b>same name, parameters and return type</b>. It is <b>runtime polymorphism</b>; the JVM chooses the method based on the actual object type.</p>
<h3>Overloading vs Overriding</h3>
<table class="tbl"><tr><th>Basis</th><th>Overloading</th><th>Overriding</th></tr>
<tr><td>Where</td><td>Same class</td><td>Parent and child class</td></tr>
<tr><td>Parameters</td><td>Must be different</td><td>Must be the same</td></tr>
<tr><td>Return type</td><td>Can be anything</td><td>Same (or covariant)</td></tr>
<tr><td>Polymorphism</td><td>Compile-time (static)</td><td>Runtime (dynamic)</td></tr>
<tr><td>Binding</td><td>Early, by compiler</td><td>Late, by JVM</td></tr>
<tr><td>Inheritance needed</td><td>No</td><td>Yes</td></tr>
<tr><td>static / private / final</td><td>Can be overloaded</td><td>Cannot be overridden</td></tr>
<tr><td>Access modifier</td><td>Any</td><td>Cannot reduce visibility</td></tr>
<tr><td>Purpose</td><td>Readability: same action, different inputs</td><td>Specific behaviour in subclass</td></tr></table>`,
  diagram: ` OVERLOADING (compile time)                  OVERRIDING (runtime)
 class Calculator                            class Animal  { sound() → "..." }
 ├─ add(int, int)          ◀─ add(2,3)            ▲
 ├─ add(int, int, int)     ◀─ add(2,3,4)   class Dog extends Animal { sound() → "Bark" }
 └─ add(double, double)    ◀─ add(2.5,3.5)
                                            Animal a = new Dog();
 compiler matches number/type/order         a.sound();  → JVM checks real object → "Bark"`,
  code: [{ t: 'Overloading (PYQ program) + overriding', src: String.raw`class Calculator {
    int add(int a, int b)           { return a + b; }
    int add(int a, int b, int c)    { return a + b + c; }     // different number
    double add(double a, double b)  { return a + b; }         // different type
    String add(String a, int b)     { return a + b; }         // different type/order
}

class Animal { void sound() { System.out.println("Animal sound"); } }
class Dog extends Animal {
    @Override void sound() { System.out.println("Dog barks"); }
}

public class Demo {
    public static void main(String[] args) {
        Calculator c = new Calculator();
        System.out.println(c.add(2, 3));        // 5
        System.out.println(c.add(2, 3, 4));     // 9
        System.out.println(c.add(2.5, 3.5));    // 6.0
        System.out.println(c.add("Java", 21));  // Java21

        Animal a = new Dog();
        a.sound();                              // Dog barks  (runtime)
    }
}`}],
  trick: `<b>Overloading = Over-Loading the same class</b> with versions (compiler decides).<br><b>Overriding = Over-Riding the parent</b> (runtime decides).<br>Compiler checks <b>N-T-O</b>: Number, Type, Order.`,
  quiz: [
    { q: 'Two methods differ ONLY in return type. Result?', o: ['Valid overloading', 'Compile error', 'Runtime error', 'Overriding'], a: 1, why: 'The return type is not part of the signature used to pick an overload.' },
    { q: 'When is an overridden method selected?', o: ['Compile time', 'Runtime, by actual object type', 'Load time', 'Randomly'], a: 1, why: 'Dynamic method dispatch happens at runtime.' },
    { q: 'Can a static method be overridden?', o: ['Yes', 'No, it is hidden instead', 'Only if public', 'Only in interfaces'], a: 1, why: 'Static methods belong to the class; redefining one in a subclass is method hiding.' }
  ]
},
{
  id: 'u1-access', unit: 1, title: 'Access Modifiers (+ C++ vs Java, Data Types)', marks: '2 / 5', mins: 12, imp: true,
  q: 'Explain the four access modifiers (public, private, protected, default) with a comparison table. <i>(Also: C++ vs Java, data types.)</i>',
  simple: `<p>Think of rooms in a house: <b>private</b> = your diary (only you), <b>default</b> = family room (only people in this house/package), <b>protected</b> = family + your kids who moved to other houses (subclasses), <b>public</b> = the street (everyone).</p>`,
  learn: [
    { title: 'private', body: `<p>Visible <b>only inside the same class</b>. Used for data hiding (encapsulation). A private constructor stops others creating objects (Singleton).</p>` },
    { title: 'default', body: `<p>No keyword written. Visible <b>only within the same package</b>. Also called package-private.</p>` },
    { title: 'protected', body: `<p>Same package <b>+ subclasses in other packages</b> (accessed through inheritance).</p>` },
    { title: 'public', body: `<p>Visible <b>everywhere</b>. A top-level class can only be <code>public</code> or default.</p>` }
  ],
  widget: 'AccessChecker',
  short: `<p><b>Access modifiers</b> control the visibility of classes, methods and variables:</p><ul><li><b>private</b>: only within the same class.</li><li><b>default</b> (no keyword): within the same package.</li><li><b>protected</b>: same package + subclasses in other packages.</li><li><b>public</b>: accessible from everywhere.</li></ul>`,
  answer: `<p><b>Access modifiers</b> (access specifiers) define the <b>scope/visibility</b> of a class, constructor, variable or method. They support encapsulation and security.</p>
<table class="tbl"><tr><th>Modifier</th><th>Same class</th><th>Same package</th><th>Subclass (other pkg)</th><th>Other package</th></tr>
<tr><td>private</td><td>✓</td><td>✗</td><td>✗</td><td>✗</td></tr>
<tr><td>default</td><td>✓</td><td>✓</td><td>✗</td><td>✗</td></tr>
<tr><td>protected</td><td>✓</td><td>✓</td><td>✓</td><td>✗</td></tr>
<tr><td>public</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr></table>
<ul><li><b>private</b>: most restrictive. Used for fields to achieve data hiding. Not inherited-accessible.</li>
<li><b>default</b>: when no modifier is written; package-level access.</li>
<li><b>protected</b>: package access + inheritance access across packages.</li>
<li><b>public</b>: least restrictive; accessible everywhere.</li>
<li>Top-level classes can only be <b>public or default</b>. An overriding method cannot reduce visibility.</li></ul>
<h3>C++ vs Java</h3>
<table class="tbl"><tr><th>C++</th><th>Java</th></tr>
<tr><td>Supports pointers</td><td>No explicit pointers (references only)</td></tr>
<tr><td>Multiple inheritance with classes</td><td>Only through interfaces</td></tr>
<tr><td>Platform dependent (compiled to machine code)</td><td>Platform independent (bytecode + JVM)</td></tr>
<tr><td>Manual memory management (new/delete, destructors)</td><td>Automatic garbage collection</td></tr>
<tr><td>Operator overloading supported</td><td>Not supported</td></tr>
<tr><td>Global variables/functions allowed</td><td>Everything inside a class</td></tr></table>
<h3>Data types</h3><p><b>Primitive (8):</b> byte (1 B), short (2), int (4), long (8), float (4), double (8), char (2, Unicode), boolean (true/false). <b>Non-primitive:</b> String, arrays, classes, interfaces.</p>
<h3>Tokens</h3><p>Smallest units of a program: <b>keywords</b> (class, static, final…), <b>identifiers</b>, <b>literals</b>, <b>operators</b>, <b>separators</b> ( ; { } ( ) ).</p>`,
  diagram: ` Visibility grows ──────────────────────────────────▶
 private      default       protected              public
 [class]  →  [package]  →  [package + subclasses] → [everywhere]`,
  code: [{ t: 'Visibility across packages', src: String.raw`package p1;
public class A {
    private   int a = 1;   // only class A
              int b = 2;   // default: package p1
    protected int c = 3;   // p1 + subclasses
    public    int d = 4;   // everywhere
}

package p2;
import p1.A;
public class B extends A {
    void test() {
        // a, b  -> ERROR (private, default)
        System.out.println(c + d);   // OK: protected via inheritance, public
    }
}`}],
  trick: `<b>"Please Don't Pet Pandas"</b> → Private < Default < Protected < Public (least → most visible).`,
  quiz: [
    { q: 'A member with NO modifier is visible…', o: ['Everywhere', 'Only in its class', 'Within its package', 'Only to subclasses'], a: 2, why: 'Default = package-private.' },
    { q: 'Which allows a subclass in another package to access the member?', o: ['private', 'default', 'protected', 'none'], a: 2, why: 'protected adds subclass access across packages.' },
    { q: 'Size of <code>char</code> in Java?', o: ['1 byte', '2 bytes', '4 bytes', 'Depends on OS'], a: 1, why: 'Java chars are 16-bit Unicode.' }
  ]
},
{
  id: 'u1-exception', unit: 1, title: 'Exception Handling & Hierarchy', marks: '2 / 10', mins: 20, imp: true,
  q: 'Explain exception handling using try, catch, finally, throw and throws, with the exception hierarchy diagram. <i>(Also: throw vs throws, checked vs unchecked, Error vs Exception.)</i>',
  simple: `<p>An exception is like a <b>fire alarm</b> in a building. When something goes wrong (divide by zero, bad input), Java "throws" an alarm. If someone <b>catches</b> it (try-catch), they handle it and the building keeps working. If nobody does, the program <b>crashes</b>. <code>finally</code> is the cleanup crew that always comes, fire or no fire.</p>`,
  learn: [
    { title: 'What & why', body: `<p>An <b>exception</b> is an unwanted event at runtime that disrupts the normal flow (e.g. <code>10/0</code>). <b>Exception handling</b> lets the program deal with it and continue instead of terminating abnormally.</p>` },
    { title: 'try / catch', body: `<p><code>try</code> wraps risky code. If an exception occurs, the rest of try is <b>skipped</b> and control jumps to the matching <code>catch</code> block. Multiple catches are allowed (specific first, general <code>Exception</code> last).</p>` },
    { title: 'finally', body: `<p><code>finally</code> <b>always executes</b>, exception or not. Used for cleanup: closing files, DB connections. (Only skipped by <code>System.exit()</code>.)</p>` },
    { title: 'throw vs throws', body: `<p><code>throw</code> = actually <b>throws one exception object</b>, inside a method: <code>throw new ArithmeticException()</code>.</p><p><code>throws</code> = <b>declares</b> in the method signature that it <i>may</i> throw: <code>void read() throws IOException</code>.</p>` },
    { title: 'Checked vs Unchecked', body: `<p><b>Checked</b>: checked by the compiler; must be handled or declared (IOException, SQLException).</p><p><b>Unchecked</b>: subclasses of RuntimeException; found at runtime (ArithmeticException, NullPointerException).</p>` }
  ],
  widget: 'ExceptionFlow',
  short: `<p><b>throw</b> is used inside a method to explicitly throw a single exception object: <code>throw new ArithmeticException("/ by 0");</code>. <b>throws</b> is used in a method signature to declare exceptions the method may pass to its caller: <code>void read() throws IOException</code>.</p><p><b>Checked</b> exceptions are verified at compile time and must be handled (IOException, SQLException). <b>Unchecked</b> exceptions (RuntimeException subclasses) occur at runtime (NullPointerException, ArithmeticException).</p>`,
  answer: `<p>An <b>exception</b> is an abnormal event that occurs during program execution and disrupts the normal flow of instructions. <b>Exception handling</b> is the mechanism to handle such runtime errors so that the normal flow of the program is maintained.</p>
<h3>Exception Hierarchy</h3><p><code>Throwable</code> is the root class with two branches: <b>Error</b> and <b>Exception</b>. Exception has checked exceptions and <code>RuntimeException</code> (unchecked).</p>
<h3>Keywords</h3><ol>
<li><b>try</b>: encloses code that may throw an exception.</li>
<li><b>catch</b>: handles the exception; must follow try; multiple catch blocks allowed.</li>
<li><b>finally</b>: always executes; used for cleanup (closing resources).</li>
<li><b>throw</b>: explicitly throws an exception object.</li>
<li><b>throws</b>: declares exceptions a method may throw.</li></ol>
<h3>Error vs Exception</h3>
<table class="tbl"><tr><th>Error</th><th>Exception</th></tr>
<tr><td>Serious problem from the JVM/system</td><td>Problem caused by the program/input</td></tr>
<tr><td>Cannot be recovered</td><td>Can be handled & recovered</td></tr>
<tr><td>OutOfMemoryError, StackOverflowError</td><td>IOException, ArithmeticException</td></tr></table>
<h3>throw vs throws</h3>
<table class="tbl"><tr><th>throw</th><th>throws</th></tr>
<tr><td>Throws an exception explicitly</td><td>Declares possible exceptions</td></tr>
<tr><td>Used inside method body</td><td>Used in method signature</td></tr>
<tr><td>Followed by an object (instance)</td><td>Followed by class name(s)</td></tr>
<tr><td>Throws one exception at a time</td><td>Can declare many, comma separated</td></tr></table>
<h3>Checked vs Unchecked</h3>
<table class="tbl"><tr><th>Checked</th><th>Unchecked</th></tr>
<tr><td>Checked at compile time</td><td>Occur at runtime</td></tr>
<tr><td>Must be handled or declared</td><td>Handling optional</td></tr>
<tr><td>Subclasses of Exception (not Runtime)</td><td>Subclasses of RuntimeException</td></tr>
<tr><td>IOException, SQLException, ClassNotFoundException</td><td>ArithmeticException, NullPointerException, ArrayIndexOutOfBoundsException</td></tr></table>
<h3>Advantages</h3><p>Maintains normal flow, separates error-handling code from regular code, groups error types, gives meaningful messages.</p>`,
  diagram: `                         Throwable
                 ┌───────────┴────────────┐
               Error                   Exception
       (serious, can't recover)            │
       • OutOfMemoryError        ┌─────────┴──────────────┐
       • StackOverflowError    CHECKED              RuntimeException
       • VirtualMachineError   (compile time)       (UNCHECKED, runtime)
                               • IOException        • ArithmeticException
                               • SQLException       • NullPointerException
                               • ClassNotFound      • ArrayIndexOutOfBounds
                               • InterruptedExc.    • NumberFormatException

 FLOW:  try ──exception?──yes──▶ matching catch ──▶ finally ──▶ rest of program
             └──no─────────────────────────────────▶ finally ──▶ rest of program`,
  code: [{ t: 'try, catch, finally, throw, throws', src: String.raw`public class ExceptionDemo {
    static void checkAge(int age) throws IllegalArgumentException {   // throws = declare
        if (age < 18)
            throw new IllegalArgumentException("Must be 18+");          // throw = create & throw
    }

    public static void main(String[] args) {
        try {
            int r = 100 / 0;                         // ArithmeticException
            System.out.println(r);                   // skipped
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("finally always runs");
        }

        try { checkAge(15); }
        catch (IllegalArgumentException e) { System.out.println(e.getMessage()); }
    }
}`}],
  trick: `<b>throw</b> = throwing <b>one ball</b> (an object). <b>throws</b> = a <b>warning sign</b> on the method ("may throw balls").<br><b>Checked = Compiler Checks.</b> Unchecked = RuntimeException family.`,
  quiz: [
    { q: 'Which block always executes?', o: ['try', 'catch', 'finally', 'throw'], a: 2, why: 'finally runs whether or not an exception occurred (except System.exit).' },
    { q: 'NullPointerException is…', o: ['Checked', 'Unchecked', 'An Error', 'Compile error'], a: 1, why: 'It extends RuntimeException.' },
    { q: '<code>throws</code> is written…', o: ['Inside catch', 'In the method signature', 'Before try', 'In finally'], a: 1, why: 'throws declares exceptions in the method header.' },
    { q: 'If an exception occurs at line 2 of a 4-line try block…', o: ['Lines 3–4 still run', 'Lines 3–4 are skipped', 'Program always crashes', 'finally is skipped'], a: 1, why: 'Control jumps immediately to the matching catch.' }
  ]
},
{
  id: 'u1-custom', unit: 1, title: 'Custom Exception (AgeException, ATM)', marks: '5 / 10', mins: 12, imp: true,
  q: 'Write a Java program to create a custom exception <code>AgeException</code> and handle it. <i>(10M variant: ATM withdrawal with InsufficientFundsException.)</i>',
  simple: `<p>Java's built-in exceptions are generic ("ArithmeticException"). For business rules ("voter must be 18+", "not enough balance") you create your <b>own exception class</b> with a meaningful name. It's just a class that <b>extends Exception</b>.</p>`,
  learn: [
    { title: 'Create it', body: `<p><code>class AgeException extends Exception</code> → <b>checked</b> custom exception. (Extend <code>RuntimeException</code> for an unchecked one.)</p>` },
    { title: 'Constructor', body: `<p>Add a constructor taking a message and pass it up: <code>super(message)</code>. Then <code>e.getMessage()</code> returns it.</p>` },
    { title: 'Throw it', body: `<p>In the method with the rule: <code>if (age &lt; 18) throw new AgeException("…");</code> and declare <code>throws AgeException</code> in the signature.</p>` },
    { title: 'Handle it', body: `<p>The caller wraps the call in <code>try { } catch (AgeException e) { }</code>, optionally with <code>finally</code>.</p>` }
  ],
  widget: 'AgeChecker',
  answer: `<p>A <b>custom (user-defined) exception</b> is an exception class created by the programmer to represent application-specific error conditions (e.g. invalid age, insufficient balance).</p>
<h3>Steps to create and use</h3><ol>
<li>Create a class that <b>extends Exception</b> (checked) or <b>RuntimeException</b> (unchecked).</li>
<li>Provide a constructor that accepts a message and calls <code>super(message)</code>.</li>
<li>In the business method, check the condition and <code>throw new AgeException(...)</code>.</li>
<li>Declare it with <code>throws AgeException</code> in the method signature (required for checked).</li>
<li>Handle it in the caller using <code>try-catch</code>, optionally with <code>finally</code>.</li></ol>
<h3>Why use custom exceptions?</h3><ul><li>Meaningful names for business errors → readable code.</li><li>Separate handling for different error types.</li><li>Carry custom messages and data.</li></ul>
<h3>ATM example (10M)</h3><p>Create <code>InsufficientFundsException</code> and <code>InvalidAmountException</code>. <code>withdraw(amt)</code> throws InvalidAmountException if amt ≤ 0 or not a multiple of 100, and InsufficientFundsException if amt > balance. The menu (Balance / Deposit / Withdraw / Exit) calls these inside try-catch, prints <code>e.getMessage()</code>, and <code>finally</code> prints "Transaction complete".</p>`,
  code: [
    { t: 'AgeException (5M)', src: String.raw`class AgeException extends Exception {          // 1. custom checked exception
    AgeException(String msg) { super(msg); }       // 2. pass message up
}

public class Voter {
    static void register(String name, int age) throws AgeException {   // 4. declare
        if (age < 18)
            throw new AgeException(name + " is " + age + ". Minimum age is 18.");  // 3. throw
        System.out.println(name + " registered!");
    }

    public static void main(String[] args) {
        try {                                        // 5. handle
            register("Asha", 22);
            register("Ravi", 15);
        } catch (AgeException e) {
            System.out.println("AgeException: " + e.getMessage());
        } finally {
            System.out.println("Process finished.");
        }
    }
}
/* Output:
Asha registered!
AgeException: Ravi is 15. Minimum age is 18.
Process finished. */`},
    { t: 'ATM withdraw (core of the 10M answer)', src: String.raw`class InsufficientFundsException extends Exception {
    InsufficientFundsException(String m) { super(m); }
}

class Account {
    private double balance = 5000;
    void withdraw(double amt) throws InsufficientFundsException {
        if (amt > balance)
            throw new InsufficientFundsException("Balance is only " + balance);
        balance -= amt;
        System.out.println("Collect cash. Left: " + balance);
    }
}
// main: menu loop -> try { acc.withdraw(x); }
//       catch (InsufficientFundsException e) { print(e.getMessage()); }
//       finally { print("Transaction complete"); }`}
  ],
  trick: `Custom exception in <b>3 lines</b>: <code>class X extends Exception { X(String m){ super(m); } }</code>, then <b>throw</b> it, <b>throws</b> it, <b>catch</b> it.`,
  quiz: [
    { q: 'To make a CHECKED custom exception, extend…', o: ['Error', 'Exception', 'RuntimeException', 'Throwable only'], a: 1, why: 'Exception (but not RuntimeException) = checked.' },
    { q: 'What does <code>super(msg)</code> in the constructor do?', o: ['Throws it', 'Stores the message so getMessage() returns it', 'Catches it', 'Nothing'], a: 1, why: 'It passes the message to the Exception parent class.' }
  ]
}
];

const cards = [
  [1, 'What is bytecode?', 'Platform-independent intermediate code in <code>.class</code> files, produced by <code>javac</code> and executed by the JVM.'],
  [1, 'Why is Java platform independent?', 'Source → bytecode once; every OS has its own JVM that runs the same bytecode (WORA).'],
  [1, 'JDK vs JRE vs JVM', '<ul><li>JDK = JRE + dev tools (javac)</li><li>JRE = JVM + libraries (run only)</li><li>JVM = executes bytecode</li></ul>'],
  [1, 'Name the 5 JVM memory areas', 'Method area, Heap, Java Stack, PC Register, Native Method Stack.'],
  [1, 'What is the JIT compiler?', 'Part of the execution engine that compiles frequently-run bytecode into native code for speed.'],
  [1, 'Encapsulation', 'Wrapping data + methods in a class and hiding data with <code>private</code>; access via getters/setters.'],
  [1, 'Abstraction: 2 ways', 'Abstract classes and interfaces. Show what, hide how.'],
  [1, 'Compile-time vs runtime polymorphism', 'Overloading (compiler decides) vs overriding (JVM decides by actual object).'],
  [1, 'Why no multiple inheritance with classes?', 'Diamond problem: ambiguity when two parents have the same method. Use interfaces.'],
  [1, 'How does the compiler choose an overloaded method?', 'By signature: Number, Type and Order of arguments. Return type is not used.'],
  [1, 'Can static methods be overridden?', 'No. Redefining one in a subclass is method hiding.'],
  [1, 'Access modifiers, least to most visible', 'private → default → protected → public.'],
  [1, 'protected means…', 'Same package + subclasses in other packages.'],
  [1, '8 primitive types', 'byte 1, short 2, int 4, long 8, float 4, double 8, char 2, boolean.'],
  [1, '4 differences C++ vs Java', 'Pointers (C++ yes), multiple inheritance (Java via interfaces), platform dependence, manual memory vs garbage collection.'],
  [1, 'throw vs throws', '<b>throw</b>: throws one object inside a method. <b>throws</b>: declares exceptions in the signature.'],
  [1, 'Checked vs Unchecked', 'Checked: compile-time, must handle (IOException). Unchecked: RuntimeException subclasses (NullPointerException).'],
  [1, 'Error vs Exception', 'Error = serious JVM problem, can\'t recover (OutOfMemoryError). Exception = program problem, can handle.'],
  [1, 'When does finally NOT run?', 'Only if the JVM exits, e.g. <code>System.exit(0)</code>.'],
  [1, 'Create a custom exception', '<code>class AgeException extends Exception { AgeException(String m){ super(m); } }</code>']
];

export default { topics, cards };
