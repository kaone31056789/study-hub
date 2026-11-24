// Unit 2 · Advanced Java & JDBC
const topics = [
{
  id: 'u2-collections', unit: 2, title: 'Collection Framework Hierarchy', marks: '10', mins: 20, imp: true,
  q: 'Explain the Collection Framework hierarchy and discuss ArrayList, LinkedList, HashSet and HashMap with examples.',
  simple: `<p>The Collection Framework is a <b>toolbox of ready-made containers</b>. Instead of building your own data structures:</p><ul>
<li><b>ArrayList</b>: a stretchy array (train seats with numbers).</li>
<li><b>LinkedList</b>: people holding hands in a chain.</li>
<li><b>HashSet</b>: a bag that refuses duplicates.</li>
<li><b>HashMap</b>: a dictionary: word (key) → meaning (value).</li></ul>`,
  learn: [
    { title: 'What', body: `<p>The <b>Collection Framework</b> (<code>java.util</code>) is a unified set of <b>interfaces</b>, <b>classes</b> and <b>algorithms</b> to store and manipulate groups of objects.</p>` },
    { title: 'Root', body: `<p><code>Iterable</code> → <code>Collection</code>. Collection has three child interfaces: <b>List</b>, <b>Set</b>, <b>Queue</b>.</p>` },
    { title: 'List', body: `<p><b>Ordered</b>, <b>duplicates allowed</b>, index-based. ArrayList, LinkedList, Vector, Stack.</p>` },
    { title: 'Set', body: `<p><b>No duplicates</b>. HashSet (no order), LinkedHashSet (insertion order), TreeSet (sorted).</p>` },
    { title: 'Queue', body: `<p>Elements processed in <b>FIFO</b> order. PriorityQueue, ArrayDeque, LinkedList.</p>` },
    { title: 'Map', body: `<p><b>Key → value</b> pairs, keys unique. <b>Not a child of Collection.</b> HashMap, LinkedHashMap, TreeMap, Hashtable.</p>` }
  ],
  widget: 'CollectionPlayground',
  answer: `<p>The <b>Collection Framework</b> is a unified architecture in <code>java.util</code> for storing and manipulating a group of objects. It provides <b>interfaces</b> (List, Set, Queue, Map), <b>implementation classes</b> (ArrayList, HashSet…) and <b>algorithms</b> (sorting, searching via the <code>Collections</code> class).</p>
<h3>Advantages</h3><p>Ready-made data structures, less programming effort, high performance, reusability, dynamic size, interoperability through common interfaces.</p>
<h3>Core interfaces</h3><ul>
<li><b>Collection</b>: root interface for a group of objects (add, remove, size, iterator).</li>
<li><b>List</b>: ordered, allows duplicates, index access.</li>
<li><b>Set</b>: unique elements only.</li>
<li><b>Queue</b>: holds elements before processing (FIFO).</li>
<li><b>Map</b>: key-value pairs with unique keys (separate hierarchy).</li></ul>
<h3>1. ArrayList</h3><p>Resizable (dynamic) array implementation of List. Maintains insertion order, allows duplicates and nulls, fast random access with <code>get(index)</code>, slower insert/delete in the middle (elements shift). Not synchronized.</p>
<h3>2. LinkedList</h3><p>Doubly linked list implementation of List and Deque. Each node stores data + previous + next reference. Fast insertion/deletion, slower access by index. Can be used as a list, stack or queue.</p>
<h3>3. HashSet</h3><p>Implements Set using a hash table (internally a HashMap). Stores <b>unique</b> elements, <b>no order guaranteed</b>, allows one null. add/remove/contains in O(1) average.</p>
<h3>4. HashMap</h3><p>Implements Map using hashing. Stores key-value pairs, keys unique (same key → value replaced), one null key and many null values allowed, no order. <code>put</code>, <code>get</code>, <code>containsKey</code>, <code>entrySet</code>.</p>
<h3>Comparison</h3>
<table class="tbl"><tr><th></th><th>ArrayList</th><th>LinkedList</th><th>HashSet</th><th>HashMap</th></tr>
<tr><td>Interface</td><td>List</td><td>List, Deque</td><td>Set</td><td>Map</td></tr>
<tr><td>Duplicates</td><td>Yes</td><td>Yes</td><td>No</td><td>Keys no, values yes</td></tr>
<tr><td>Order</td><td>Insertion</td><td>Insertion</td><td>None</td><td>None</td></tr>
<tr><td>Structure</td><td>Dynamic array</td><td>Doubly linked list</td><td>Hash table</td><td>Hash table</td></tr></table>`,
  diagram: `                       Iterable «interface»
                          │
                      Collection «interface»
         ┌────────────────┼─────────────────┐
       List              Set              Queue
         │                │                 │
  ┌──────┼──────┐    ┌────┴──────┐     ┌────┴────────┐
ArrayList │  Vector HashSet  SortedSet PriorityQueue Deque
     LinkedList │     │         │                   │
              Stack LinkedHashSet TreeSet       ArrayDeque

      Map «interface»   (separate: key → value)
     ┌──────┼──────────┐
 HashMap  Hashtable  SortedMap
     │                   │
 LinkedHashMap        TreeMap`,
  code: [{ t: 'Using all four', src: String.raw`import java.util.*;

public class CollectionDemo {
    public static void main(String[] args) {
        List<String> al = new ArrayList<>();
        al.add("Asha"); al.add("Ravi"); al.add("Asha");     // duplicates OK
        System.out.println(al.get(0));                      // Asha

        LinkedList<Integer> ll = new LinkedList<>();
        ll.add(10); ll.addFirst(5); ll.removeLast();         // [5]

        Set<String> hs = new HashSet<>(al);                  // {Asha, Ravi}: no duplicates

        Map<Integer, String> hm = new HashMap<>();
        hm.put(101, "Asha"); hm.put(102, "Ravi");
        hm.put(101, "Neha");                                 // key 101 value replaced
        for (Map.Entry<Integer, String> e : hm.entrySet())
            System.out.println(e.getKey() + " = " + e.getValue());
    }
}`}],
  trick: `<b>L-S-Q + M</b>: <b>L</b>ist = Line (ordered, dups OK) · <b>S</b>et = Single copies · <b>Q</b>ueue = FIFO line · <b>M</b>ap = dictionary (separate family).`,
  quiz: [
    { q: 'Which does NOT extend the Collection interface?', o: ['List', 'Set', 'Queue', 'Map'], a: 3, why: 'Map is a separate hierarchy (key-value pairs).' },
    { q: 'Adding a duplicate to a HashSet…', o: ['Throws exception', 'Is ignored (add returns false)', 'Replaces old', 'Doubles size'], a: 1, why: 'Sets store unique elements only.' },
    { q: 'HashMap: put(101,"A") then put(101,"B"). get(101)?', o: ['A', 'B', '[A, B]', 'Exception'], a: 1, why: 'Keys are unique; the value is replaced.' }
  ]
},
{
  id: 'u2-al-ll', unit: 2, title: 'ArrayList vs LinkedList', marks: '5', mins: 8, imp: true,
  q: 'Differentiate between ArrayList and LinkedList.',
  simple: `<p><b>ArrayList</b> = numbered seats in a cinema. Finding seat 50 is instant, but squeezing a new person into seat 3 means everyone after shifts one seat.</p><p><b>LinkedList</b> = people holding hands. Finding the 50th person means counting from the start, but adding someone is just letting go and holding hands with the new person.</p>`,
  widget: 'ListCompare',
  answer: `<p>Both implement the <b>List</b> interface, maintain insertion order and allow duplicates, but their internal structure differs.</p>
<table class="tbl"><tr><th>Basis</th><th>ArrayList</th><th>LinkedList</th></tr>
<tr><td>Internal structure</td><td>Dynamic (resizable) array</td><td>Doubly linked list</td></tr>
<tr><td>Access by index <code>get(i)</code></td><td>Fast, O(1)</td><td>Slow, O(n) (traverses nodes)</td></tr>
<tr><td>Insert/delete in middle</td><td>Slow, O(n) (elements shift)</td><td>Fast, O(1) once at the node (links change)</td></tr>
<tr><td>Memory</td><td>Less (stores only data)</td><td>More (data + prev + next pointers)</td></tr>
<tr><td>Interfaces</td><td>List, RandomAccess</td><td>List, Deque</td></tr>
<tr><td>Use as Queue/Stack</td><td>No</td><td>Yes (addFirst, removeLast…)</td></tr>
<tr><td>Resizing</td><td>Grows by ~50% when full</td><td>No resizing needed</td></tr>
<tr><td>Best for</td><td>Frequent reading/searching</td><td>Frequent insertion/deletion</td></tr></table>`,
  diagram: ` ArrayList:   [ A | B | C | D | E ]      contiguous, index 0..4
                              get(3) → jump directly

 LinkedList:  null ← [A] ⇄ [B] ⇄ [C] ⇄ [D] ⇄ [E] → null
               each node: prev | data | next`,
  code: [{ t: 'Usage', src: String.raw`List<String> al = new ArrayList<>(List.of("A", "B", "C"));
al.get(2);            // fast
LinkedList<String> ll = new LinkedList<>(List.of("A", "B", "C"));
ll.addFirst("Z");     // fast at ends
ll.removeLast();`}],
  trick: `<b>A</b>rrayList = <b>A</b>ccess fast. <b>L</b>inkedList = <b>L</b>inks change fast (insert/delete).`,
  quiz: [
    { q: 'Fastest for get(5000)?', o: ['ArrayList', 'LinkedList', 'Same', 'Neither'], a: 0, why: 'ArrayList uses direct index access, O(1).' },
    { q: 'Which can be used as a Queue/Deque?', o: ['ArrayList', 'LinkedList', 'Both', 'Neither'], a: 1, why: 'LinkedList implements Deque.' }
  ]
},
{
  id: 'u2-hm-tm', unit: 2, title: 'HashMap vs TreeMap', marks: '5', mins: 8, imp: true,
  q: 'Differentiate between HashMap and TreeMap.',
  simple: `<p>Both store <b>key → value</b>. <b>HashMap</b> is a messy but super-fast drawer: you find things instantly, but in no particular order. <b>TreeMap</b> is an alphabetically sorted file cabinet: slightly slower, always in order.</p>`,
  widget: 'MapCompare',
  answer: `<p>Both implement the <b>Map</b> interface and store unique keys with values.</p>
<table class="tbl"><tr><th>Basis</th><th>HashMap</th><th>TreeMap</th></tr>
<tr><td>Internal structure</td><td>Hash table (array of buckets; tree bins since Java 8)</td><td>Red-Black tree (self-balancing BST)</td></tr>
<tr><td>Order of keys</td><td>No order</td><td>Sorted (natural order or Comparator)</td></tr>
<tr><td>Performance</td><td>O(1) average for get/put</td><td>O(log n)</td></tr>
<tr><td>Null key</td><td>One null key allowed</td><td>Not allowed (NullPointerException)</td></tr>
<tr><td>Null values</td><td>Allowed</td><td>Allowed</td></tr>
<tr><td>Comparison uses</td><td>hashCode() and equals()</td><td>compareTo() / Comparator</td></tr>
<tr><td>Interfaces</td><td>Map</td><td>Map, SortedMap, NavigableMap</td></tr>
<tr><td>Extra methods</td><td>-</td><td>firstKey(), lastKey(), headMap(), tailMap()</td></tr>
<tr><td>Use when</td><td>Fast lookup, order doesn't matter</td><td>Need sorted keys / range queries</td></tr></table>`,
  code: [{ t: 'Same data, different order', src: String.raw`Map<String, Integer> hm = new HashMap<>();
Map<String, Integer> tm = new TreeMap<>();
for (String f : new String[]{"Mango", "Apple", "Banana"}) { hm.put(f, 1); tm.put(f, 1); }
System.out.println(hm);   // order not guaranteed
System.out.println(tm);   // {Apple=1, Banana=1, Mango=1}  sorted
hm.put(null, 0);          // OK
// tm.put(null, 0);       // NullPointerException`}],
  trick: `<b>H</b>ashMap = <b>H</b>urry (fast, unordered, null OK). <b>T</b>reeMap = <b>T</b>idy (sorted, no null key).`,
  quiz: [
    { q: 'Which keeps keys sorted?', o: ['HashMap', 'TreeMap', 'Both', 'Neither'], a: 1, why: 'TreeMap is a Red-Black tree sorted by key.' },
    { q: 'TreeMap.put(null, 1)?', o: ['Works', 'NullPointerException', 'Ignored', 'Compile error'], a: 1, why: 'TreeMap must compare keys, and null can\'t be compared.' }
  ]
},
{
  id: 'u2-thread-life', unit: 2, title: 'Thread Life Cycle & Creating Threads', marks: '2 / 10', mins: 18, imp: true,
  q: 'Explain the thread life cycle with a diagram and the two ways to create a thread. <i>(Also: purpose of join() and sleep().)</i>',
  simple: `<p>A thread is like a <b>worker</b>. Hired (<b>New</b>) → waiting for a desk (<b>Runnable</b>) → working at the desk (<b>Running</b>) → on a break or waiting for a key (<b>Blocked/Waiting</b>) → goes back to the queue → finally retires (<b>Terminated</b>). A retired worker can't be re-hired.</p>`,
  learn: [
    { title: 'Thread', body: `<p>A <b>thread</b> is a lightweight sub-process, the smallest unit of execution. <b>Multithreading</b> = running multiple threads concurrently to use the CPU better (e.g. downloading while typing).</p>` },
    { title: 'New → Runnable', body: `<p><code>new Thread()</code> → <b>New</b>. Calling <code>start()</code> → <b>Runnable</b> (ready, waiting for CPU).</p>` },
    { title: 'Running', body: `<p>The <b>thread scheduler</b> picks it → <b>Running</b>; its <code>run()</code> method executes.</p>` },
    { title: 'Blocked / Waiting', body: `<p><code>sleep()</code>, <code>wait()</code>, <code>join()</code>, or waiting for a lock → not runnable for a while. When done, it goes back to <b>Runnable</b>.</p>` },
    { title: 'Terminated', body: `<p><code>run()</code> completes → <b>Terminated (Dead)</b>. Calling <code>start()</code> again throws <code>IllegalThreadStateException</code>.</p>` },
    { title: '2 ways', body: `<p>1. <b>extend Thread</b> and override <code>run()</code>.<br>2. <b>implement Runnable</b> and pass it to <code>new Thread(r)</code>. This is preferred because your class can still extend another class.</p>` }
  ],
  widget: 'ThreadLifecycle',
  short: `<p><b>join()</b>: makes the current thread <b>wait until the other thread finishes</b> (<code>t1.join()</code> → main waits for t1).</p><p><b>sleep(ms)</b>: pauses the current thread for the given milliseconds (TIMED_WAITING) without releasing locks; it then returns to Runnable.</p>`,
  answer: `<p>A <b>thread</b> is a lightweight unit of execution within a process. <b>Multithreading</b> allows concurrent execution of two or more threads for maximum CPU utilisation.</p>
<h3>Thread Life Cycle (states)</h3><ol>
<li><b>New</b>: thread object is created but <code>start()</code> is not yet called.</li>
<li><b>Runnable</b>: after <code>start()</code>; ready to run, waiting for the CPU in the ready queue.</li>
<li><b>Running</b>: the scheduler has selected it; <code>run()</code> is executing.</li>
<li><b>Blocked / Waiting / Timed Waiting</b>: temporarily inactive: waiting for a lock (blocked), for another thread via <code>wait()</code>/<code>join()</code> (waiting), or for a time via <code>sleep(ms)</code> (timed waiting). Returns to Runnable when the condition is over.</li>
<li><b>Terminated (Dead)</b>: <code>run()</code> has completed or an uncaught exception occurred. Cannot be restarted.</li></ol>
<h3>Ways to create a thread</h3>
<p><b>1. Extending the Thread class:</b> create a subclass of <code>Thread</code>, override <code>run()</code>, create an object and call <code>start()</code>.</p>
<p><b>2. Implementing the Runnable interface:</b> implement <code>run()</code>, pass the object to a <code>Thread</code> constructor, call <code>start()</code>. Preferred because Java allows only single inheritance, it separates the task from the thread, and it works with lambdas.</p>
<table class="tbl"><tr><th>Extending Thread</th><th>Implementing Runnable</th></tr>
<tr><td>Cannot extend any other class</td><td>Can still extend another class</td></tr>
<tr><td>Task and thread tightly coupled</td><td>Task separate from thread (loose coupling)</td></tr>
<tr><td>Each thread = new object of subclass</td><td>Same Runnable can be shared by many threads</td></tr></table>
<h3>start() vs run()</h3><p><code>start()</code> creates a new thread and then calls <code>run()</code> in it. Calling <code>run()</code> directly just executes it like a normal method in the <b>current</b> thread.</p>
<h3>Important methods</h3><p><code>start()</code>, <code>run()</code>, <code>sleep(ms)</code>, <code>join()</code>, <code>yield()</code>, <code>setPriority()</code>, <code>getName()</code>, <code>isAlive()</code>, and <code>wait()/notify()</code> (from Object).</p>`,
  diagram: `                start()                 scheduler picks
  ┌──────┐ ───────────▶ ┌──────────┐ ─────────────────▶ ┌──────────┐
  │ NEW  │              │ RUNNABLE │                    │ RUNNING  │
  └──────┘              └──────────┘ ◀───────────────── └────┬─────┘
                             ▲        yield / time slice      │  │
                             │                                │  │ run() ends
     notify() / time over /  │      sleep(), wait(), join(),  │  ▼
     lock released           │      lock busy, I/O            │ ┌────────────┐
                       ┌─────┴──────────────┐ ◀───────────────┘ │ TERMINATED │
                       │ BLOCKED / WAITING / │                   └────────────┘
                       │ TIMED_WAITING       │
                       └────────────────────┘`,
  code: [{ t: 'Both ways', src: String.raw`// Way 1: extend Thread
class MyThread extends Thread {
    public void run() { System.out.println("Thread running: " + getName()); }
}

// Way 2: implement Runnable (preferred)
class MyTask implements Runnable {
    public void run() { System.out.println("Runnable running"); }
}

public class ThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        MyThread t1 = new MyThread();          // NEW
        t1.start();                            // RUNNABLE -> RUNNING
        Thread t2 = new Thread(new MyTask());
        t2.start();
        Thread t3 = new Thread(() -> System.out.println("Lambda thread"));
        t3.start();
        t1.join();                             // main waits for t1 to finish
        Thread.sleep(500);                     // main pauses 0.5 s
    }
}`}],
  trick: `States: <b>"New Runners Run, Wait, Then die"</b> → New, Runnable, Running, Waiting/Blocked, Terminated.`,
  quiz: [
    { q: 'After calling start(), a thread is in…', o: ['New', 'Runnable', 'Running', 'Terminated'], a: 1, why: 'start() moves it to Runnable; the scheduler later makes it Running.' },
    { q: 'Calling start() twice on a thread…', o: ['Restarts it', 'IllegalThreadStateException', 'Ignored', 'Creates a second thread'], a: 1, why: 'A thread can be started only once.' },
    { q: 'Why is Runnable preferred over extending Thread?', o: ['It is faster', 'Your class can still extend another class', 'It avoids synchronization', 'It has more methods'], a: 1, why: 'Java has single inheritance of classes.' },
    { q: 't1.join() inside main means…', o: ['t1 waits for main', 'main waits until t1 finishes', 'Both stop', 't1 restarts'], a: 1, why: 'The calling thread waits for t1 to die.' }
  ]
},
{
  id: 'u2-sync', unit: 2, title: 'Synchronization, Even/Odd Threads & Priority', marks: '5', mins: 15, pyq: 'Q7 · 5M', imp: true,
  q: 'Demonstrate multithreading by creating two threads, one printing even numbers and the other odd numbers from 1 to 20. Explain how thread priority works. <i>(Also: synchronization with advantages/disadvantages.)</i>',
  simple: `<p>Two people trying to book the <b>last train seat</b> at the same moment from two counters: both see "1 seat free", both book → <b>double booking</b>. <b>Synchronization</b> puts a <b>lock</b> on the booking counter so only one person can use it at a time.</p><p><b>Priority</b> is like a VIP tag: it <i>suggests</i> to the scheduler who should go first, but it's not a guarantee.</p>`,
  learn: [
    { title: 'Race condition', body: `<p>When multiple threads read and modify <b>shared data</b> at the same time, the result depends on timing and can be wrong (lost updates, double booking).</p>` },
    { title: 'synchronized', body: `<p>Every object has a <b>monitor lock</b>. A thread entering a <code>synchronized</code> method/block acquires the lock; other threads trying to enter are <b>BLOCKED</b> until it's released.</p>` },
    { title: 'Forms', body: `<p>• <b>synchronized method</b>: <code>synchronized void book()</code><br>• <b>synchronized block</b>: <code>synchronized(this) { … }</code> (locks only the critical part)<br>• <b>static synchronized</b>: class-level lock.</p>` },
    { title: 'Priority', body: `<p>Range <b>1 to 10</b>: <code>MIN_PRIORITY = 1</code>, <code>NORM_PRIORITY = 5</code> (default), <code>MAX_PRIORITY = 10</code>. Set with <code>setPriority()</code>. Higher priority threads are <b>preferred</b> by the scheduler, but the order is <b>not guaranteed</b> (OS-dependent).</p>` }
  ],
  widget: 'SyncDemo',
  answer: `<h3>Multithreading (Even/Odd program)</h3><p>Two threads run concurrently: <code>EvenThread</code> prints 2, 4 … 20 and <code>OddThread</code> prints 1, 3 … 19. Both are started with <code>start()</code>; the output interleaves depending on the scheduler.</p>
<h3>Thread Priority</h3><ul>
<li>Every thread has a priority from <b>1 to 10</b>.</li>
<li>Constants: <code>Thread.MIN_PRIORITY</code> = 1, <code>Thread.NORM_PRIORITY</code> = 5 (default), <code>Thread.MAX_PRIORITY</code> = 10.</li>
<li>Set/get with <code>setPriority(int)</code> / <code>getPriority()</code>. A new thread inherits its parent's priority.</li>
<li>The thread scheduler <b>generally prefers</b> higher-priority threads (preemptive scheduling), but behaviour is <b>platform-dependent</b>, so priority is only a <b>hint</b> and doesn't guarantee execution order.</li></ul>
<h3>Synchronization</h3><p>Synchronization is the mechanism that allows <b>only one thread at a time</b> to access a shared resource (the critical section), preventing <b>race conditions</b> and data inconsistency. It works through the object's <b>intrinsic lock (monitor)</b>. Inter-thread communication uses <code>wait()</code>, <code>notify()</code>, <code>notifyAll()</code>.</p>
<h3>Advantages</h3><ul><li>Prevents race conditions and data inconsistency.</li><li>Makes shared objects thread-safe (e.g. no double booking of seats).</li><li>Enables safe communication between threads.</li></ul>
<h3>Disadvantages</h3><ul><li>Slower performance: threads wait for locks.</li><li>Possibility of <b>deadlock</b> (two threads waiting on each other's locks).</li><li>Can cause starvation; reduces concurrency.</li></ul>`,
  code: [
    { t: 'Even / Odd threads with priority (PYQ)', src: String.raw`class EvenThread extends Thread {
    public void run() {
        for (int i = 2; i <= 20; i += 2) System.out.println("Even: " + i);
    }
}
class OddThread extends Thread {
    public void run() {
        for (int i = 1; i <= 20; i += 2) System.out.println("Odd : " + i);
    }
}

public class EvenOdd {
    public static void main(String[] args) {
        EvenThread even = new EvenThread();
        OddThread  odd  = new OddThread();
        even.setPriority(Thread.MAX_PRIORITY);   // 10
        odd.setPriority(Thread.MIN_PRIORITY);    // 1
        even.start();
        odd.start();
        // order may vary: priority is only a hint to the scheduler
    }
}`},
    { t: 'synchronized ticket booking', src: String.raw`class TicketCounter {
    private int seats = 1;
    synchronized void book(String name) {          // only one thread at a time
        if (seats > 0) { System.out.println(name + " booked"); seats--; }
        else System.out.println(name + ": sold out");
    }
}
// Two threads call counter.book(...) -> no double booking`}
  ],
  trick: `Priority: <b>1 – 5 – 10</b> (MIN – NORM – MAX). It's a <b>hint, not a promise</b>.<br>synchronized = <b>one key, one room, one thread</b>.`,
  quiz: [
    { q: 'Default priority of a thread?', o: ['1', '5', '10', '0'], a: 1, why: 'NORM_PRIORITY = 5.' },
    { q: 'Does MAX_PRIORITY guarantee a thread runs first?', o: ['Yes always', 'No, it\'s only a hint to the scheduler', 'Only on Windows', 'Only with join()'], a: 1, why: 'Scheduling is platform-dependent.' },
    { q: 'A thread trying to enter a synchronized method held by another thread is…', o: ['Terminated', 'BLOCKED', 'NEW', 'Running'], a: 1, why: 'It waits for the monitor lock.' },
    { q: 'A disadvantage of synchronization:', o: ['Race conditions', 'Possible deadlock & slower speed', 'Data inconsistency', 'More memory leaks'], a: 1, why: 'Threads wait for locks and can deadlock.' }
  ]
},
{
  id: 'u2-lambda', unit: 2, title: 'Lambda Expressions & Functional Interfaces', marks: '5', mins: 12, imp: true,
  q: 'Explain lambda expressions and functional interfaces with programs. <i>(Also: method references.)</i>',
  simple: `<p>A lambda is a <b>function without a name</b>, a shortcut for writing a tiny class with one method. Instead of writing a full letter ("Dear Comparator, please implement compare…"), you write a sticky note: <code>(a, b) -> a - b</code>.</p>`,
  learn: [
    { title: 'Lambda', body: `<p>Introduced in <b>Java 8</b>. Syntax: <code>(parameters) -> expression</code> or <code>(parameters) -> { statements; }</code>.</p><p><code>() -> 5</code> · <code>x -> x * x</code> · <code>(a, b) -> a + b</code></p>` },
    { title: 'Functional interface', body: `<p>An interface with <b>exactly one abstract method</b> (can have default/static methods). <code>@FunctionalInterface</code> makes the compiler check this. A lambda can only target a functional interface.</p>` },
    { title: 'Built-ins', body: `<p><code>Predicate&lt;T&gt;</code> test → boolean · <code>Function&lt;T,R&gt;</code> apply → R · <code>Consumer&lt;T&gt;</code> accept → void · <code>Supplier&lt;T&gt;</code> get → T. Also Runnable, Comparator.</p>` },
    { title: 'Method references', body: `<p>An even shorter lambda when you just call an existing method: <code>System.out::println</code>, <code>String::toUpperCase</code>, <code>Math::sqrt</code>, <code>Student::new</code>.</p>` }
  ],
  widget: 'LambdaShrink',
  answer: `<h3>Lambda Expression</h3><p>A lambda expression (Java 8) is a short block of code that takes parameters and returns a value, i.e. an <b>anonymous function</b>. It provides an implementation of the single abstract method of a functional interface.</p>
<p><b>Syntax:</b> <code>(parameter-list) -> { body }</code></p><ul>
<li>No parameter: <code>() -> System.out.println("Hi")</code></li>
<li>One parameter: <code>n -> n * n</code></li>
<li>Multiple: <code>(a, b) -> a + b</code></li>
<li>Block body: <code>(a, b) -> { int s = a + b; return s; }</code></li></ul>
<h3>Functional Interface</h3><p>An interface containing <b>exactly one abstract method</b> (SAM: Single Abstract Method). It may have any number of default and static methods. Annotated with <code>@FunctionalInterface</code> (optional, but the compiler then enforces the rule). Examples: <code>Runnable</code>, <code>Comparator</code>, <code>Callable</code>.</p>
<table class="tbl"><tr><th>Interface (java.util.function)</th><th>Method</th><th>Use</th></tr>
<tr><td>Predicate&lt;T&gt;</td><td>boolean test(T)</td><td>condition / filter</td></tr>
<tr><td>Function&lt;T,R&gt;</td><td>R apply(T)</td><td>transform</td></tr>
<tr><td>Consumer&lt;T&gt;</td><td>void accept(T)</td><td>perform action</td></tr>
<tr><td>Supplier&lt;T&gt;</td><td>T get()</td><td>produce value</td></tr></table>
<h3>Method References</h3><p>Shorthand for lambdas that call an existing method: static (<code>Math::sqrt</code>), instance of object (<code>System.out::println</code>), instance of type (<code>String::length</code>), constructor (<code>ArrayList::new</code>).</p>
<h3>Advantages</h3><p>Less boilerplate code (no anonymous classes), more readable, enables functional programming and the Stream API, easy parallel processing.</p>`,
  code: [{ t: 'Lambda + functional interface + sorting', src: String.raw`import java.util.*;
import java.util.function.*;

@FunctionalInterface
interface Calculator { int operate(int a, int b); }    // exactly one abstract method

public class LambdaDemo {
    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b;
        Calculator mul = (a, b) -> a * b;
        System.out.println(add.operate(4, 5) + " " + mul.operate(4, 5));   // 9 20

        Predicate<Integer> isEven = n -> n % 2 == 0;
        Function<String, Integer> len = s -> s.length();
        System.out.println(isEven.test(10) + " " + len.apply("Java"));    // true 4

        List<String> names = new ArrayList<>(List.of("Ravi", "Asha", "Neha"));
        names.sort((x, y) -> x.compareTo(y));         // lambda as Comparator
        names.forEach(System.out::println);           // method reference
    }
}`}],
  trick: `Lambda = <b>(input) -> output</b>. Functional interface = <b>ONE abstract method</b> ("SAM").<br>Built-ins: <b>P-F-C-S</b> → Predicate tests, Function transforms, Consumer eats, Supplier gives.`,
  quiz: [
    { q: 'A functional interface has…', o: ['No methods', 'Exactly one abstract method', 'Only default methods', 'Two abstract methods'], a: 1, why: 'SAM: Single Abstract Method.' },
    { q: 'Which returns boolean?', o: ['Function', 'Consumer', 'Predicate', 'Supplier'], a: 2, why: 'Predicate.test(T) returns boolean.' },
    { q: '<code>System.out::println</code> is a…', o: ['Lambda block', 'Method reference', 'Stream', 'Interface'], a: 1, why: 'object::method form.' }
  ]
},
{
  id: 'u2-stream', unit: 2, title: 'Stream API (filter, map, sorted, reduce)', marks: '10', mins: 15, imp: true,
  q: 'Explain the Stream API (filter, map, sorted, reduce) with programs.',
  simple: `<p>A stream is a <b>factory conveyor belt</b>. Items from a list go on the belt, pass through machines: a <b>filter</b> machine throws away bad items, a <b>map</b> machine paints each item, a <b>sort</b> machine orders them, and at the end <b>reduce</b> packs them into one box. The original list (warehouse) is untouched.</p>`,
  learn: [
    { title: 'Stream', body: `<p>A <b>Stream</b> (<code>java.util.stream</code>, Java 8) is a sequence of elements supporting functional-style operations on collections. You say <i>what</i> to do, not <i>how</i> to loop.</p>` },
    { title: 'Pipeline', body: `<p><b>Source</b> (<code>list.stream()</code>) → zero or more <b>intermediate</b> operations → one <b>terminal</b> operation.</p>` },
    { title: 'Intermediate', body: `<p><code>filter</code>, <code>map</code>, <code>sorted</code>, <code>distinct</code>, <code>limit</code>. They return a new Stream and are <b>lazy</b>: nothing runs until a terminal op.</p>` },
    { title: 'Terminal', body: `<p><code>collect</code>, <code>forEach</code>, <code>reduce</code>, <code>count</code>, <code>min/max</code>. They produce the result and close the stream (a stream can be used <b>once</b>).</p>` }
  ],
  widget: 'StreamPipeline',
  answer: `<p>The <b>Stream API</b> (Java 8, <code>java.util.stream</code>) is used to process collections of objects in a functional and declarative way. A stream is a sequence of elements from a source that supports aggregate operations.</p>
<h3>Features</h3><ul><li>Does <b>not store</b> data; it carries elements from a source (collection, array).</li><li>Does <b>not modify</b> the source.</li><li><b>Lazy</b>: intermediate operations execute only when a terminal operation is invoked.</li><li>Can be consumed <b>only once</b>.</li><li>Supports <b>parallel</b> processing (<code>parallelStream()</code>).</li></ul>
<h3>Operations</h3><ol>
<li><b>filter(Predicate)</b>: selects elements matching a condition. <code>.filter(x -> x > 50)</code></li>
<li><b>map(Function)</b>: transforms each element into another. <code>.map(x -> x * 2)</code>, <code>.map(s -> s.name)</code></li>
<li><b>sorted() / sorted(Comparator)</b>: sorts in natural or custom order.</li>
<li><b>reduce(identity, BinaryOperator)</b>: combines all elements into a single value. <code>.reduce(0, (a, b) -> a + b)</code></li>
<li><b>collect(Collectors.toList())</b>: gathers the result into a collection. Also <code>groupingBy</code>, <code>joining</code>, <code>averagingDouble</code>.</li>
<li>Others: <code>forEach</code>, <code>count</code>, <code>distinct</code>, <code>limit</code>, <code>min/max</code>, <code>anyMatch</code>.</li></ol>
<h3>Intermediate vs Terminal</h3>
<table class="tbl"><tr><th>Intermediate</th><th>Terminal</th></tr><tr><td>Return a Stream</td><td>Return a result / void</td></tr><tr><td>Lazy</td><td>Trigger execution</td></tr><tr><td>Can be chained</td><td>Only one, at the end</td></tr><tr><td>filter, map, sorted</td><td>collect, reduce, forEach, count</td></tr></table>
<h3>Advantages</h3><p>Concise readable code, no explicit loops, easy parallelism, chaining of operations.</p>`,
  diagram: ` SOURCE          INTERMEDIATE (lazy)                       TERMINAL
 list.stream() → filter(m > 75) → sorted(by marks) → map(name) → collect(toList())

 [45, 80, 92, 70, 88]
    filter(x > 75)  → [80, 92, 88]
    map(x * 2)      → [160, 184, 176]
    sorted()        → [160, 176, 184]
    reduce(0, +)    → 520`,
  code: [{ t: 'filter, map, sorted, reduce, collect', src: String.raw`import java.util.*;
import java.util.stream.*;

public class StreamDemo {
    public static void main(String[] args) {
        List<Integer> nums = List.of(45, 80, 92, 70, 88);

        List<Integer> res = nums.stream()
                .filter(x -> x > 75)              // [80, 92, 88]
                .map(x -> x * 2)                  // [160, 184, 176]
                .sorted()                         // [160, 176, 184]
                .collect(Collectors.toList());

        int sum = nums.stream().reduce(0, (a, b) -> a + b);   // 375
        System.out.println(res + " " + sum);

        // students scoring above 75, sorted by marks, print names
        // students.stream().filter(s -> s.marks > 75)
        //         .sorted(Comparator.comparingDouble(s -> s.marks))
        //         .map(s -> s.name).forEach(System.out::println);
    }
}`}],
  trick: `<b>"Fat Mice Sort Rice"</b> → Filter, Map, Sorted, Reduce. Intermediate = <b>lazy</b>; Terminal = <b>trigger</b>.`,
  quiz: [
    { q: 'Which is a terminal operation?', o: ['filter', 'map', 'sorted', 'reduce'], a: 3, why: 'reduce produces a final result.' },
    { q: 'Does a stream modify the original list?', o: ['Yes', 'No', 'Only with map', 'Only when sorted'], a: 1, why: 'Streams never change their source.' },
    { q: 'Intermediate operations are…', o: ['Eager', 'Lazy', 'Terminal', 'Synchronized'], a: 1, why: 'They run only when a terminal operation is called.' }
  ]
},
{
  id: 'u2-jdbc', unit: 2, title: 'JDBC Architecture, Drivers & Statements', marks: '5 / 10', mins: 18, imp: true,
  q: 'Explain JDBC architecture and the steps to connect to a database. Differentiate between Statement and PreparedStatement. <i>(Also: 4 driver types, CRUD + MVC.)</i>',
  simple: `<p>JDBC is a <b>translator</b> between your Java program and a database. Java speaks Java; MySQL speaks SQL over its own protocol. The <b>driver</b> is the translator for one specific database, and <b>DriverManager</b> is the receptionist who hands you the right translator.</p>`,
  learn: [
    { title: '1. Load driver', body: `<p><code>Class.forName("com.mysql.cj.jdbc.Driver");</code> registers the driver (automatic since JDBC 4.0).</p>` },
    { title: '2. Connect', body: `<p><code>Connection con = DriverManager.getConnection(url, user, pass);</code><br>URL: <code>jdbc:mysql://localhost:3306/college</code></p>` },
    { title: '3. Statement', body: `<p><code>PreparedStatement ps = con.prepareStatement("INSERT INTO student VALUES (?, ?)");</code> then <code>ps.setInt(1, 101)</code>…</p>` },
    { title: '4. Execute', body: `<p><code>executeQuery()</code> for SELECT → returns <b>ResultSet</b> (loop with <code>rs.next()</code>).<br><code>executeUpdate()</code> for INSERT/UPDATE/DELETE → returns rows affected.</p>` },
    { title: '5. Close', body: `<p><code>con.close();</code> (or use try-with-resources). Releases the DB connection.</p>` }
  ],
  widget: 'SqlInjection',
  answer: `<p><b>JDBC (Java Database Connectivity)</b> is a Java API (<code>java.sql</code>) used to connect and execute queries with a database. It provides a standard interface so the same Java code works with MySQL, Oracle etc. by changing only the driver.</p>
<h3>JDBC Architecture</h3><ul>
<li><b>Java Application</b>: issues SQL through JDBC API calls.</li>
<li><b>JDBC API</b>: interfaces/classes: <code>DriverManager</code>, <code>Connection</code>, <code>Statement</code>, <code>PreparedStatement</code>, <code>ResultSet</code>, <code>SQLException</code>.</li>
<li><b>DriverManager</b>: manages drivers and creates connections.</li>
<li><b>JDBC Driver</b>: converts JDBC calls into DB-specific protocol.</li>
<li><b>Database</b>: MySQL, Oracle…</li></ul>
<p>Two-tier: app talks to DB directly. Three-tier: app → middle tier (server) → DB.</p>
<h3>Types of JDBC Drivers</h3>
<table class="tbl"><tr><th>Type</th><th>Name</th><th>How</th></tr>
<tr><td>1</td><td>JDBC-ODBC Bridge</td><td>Converts JDBC → ODBC calls (obsolete)</td></tr>
<tr><td>2</td><td>Native-API driver</td><td>Uses DB's native client libraries (partly Java)</td></tr>
<tr><td>3</td><td>Network Protocol driver</td><td>Talks to a middleware server</td></tr>
<tr><td>4</td><td>Thin driver (pure Java)</td><td>Directly speaks DB protocol. Most used (MySQL Connector/J)</td></tr></table>
<h3>Steps to connect</h3><ol><li>Load/register the driver: <code>Class.forName()</code></li><li>Create a connection: <code>DriverManager.getConnection()</code></li><li>Create a statement: <code>createStatement()</code> / <code>prepareStatement()</code></li><li>Execute query & process <code>ResultSet</code></li><li>Close the connection</li></ol>
<h3>Statement vs PreparedStatement</h3>
<table class="tbl"><tr><th>Statement</th><th>PreparedStatement</th></tr>
<tr><td>Static SQL, compiled every time</td><td>Precompiled once, executed many times</td></tr>
<tr><td>Values joined into the SQL string</td><td>Uses <code>?</code> placeholders + setXxx()</td></tr>
<tr><td>Vulnerable to <b>SQL injection</b></td><td>Prevents SQL injection</td></tr>
<tr><td>Slower for repeated queries</td><td>Faster for repeated queries</td></tr>
<tr><td>Can't easily store binary data</td><td>Supports binary data (setBlob)</td></tr></table>
<h3>Transactions & MVC</h3><p><code>con.setAutoCommit(false)</code> → <code>commit()</code> on success, <code>rollback()</code> on failure (data integrity). In <b>MVC</b>: Model = <code>Student</code> class, View = menu/console, Controller = class with JDBC CRUD methods. In Oracle, <b>sequences</b> generate IDs (<code>SELECT seq.NEXTVAL FROM DUAL</code>; DUAL is a one-row dummy table) and dates use <code>java.sql.Date</code> with <code>ps.setDate()</code>.</p>`,
  diagram: ` ┌─────────────────────┐
 │  Java Application   │
 └──────────┬──────────┘
            │  JDBC API (Connection, Statement, ResultSet)
 ┌──────────▼──────────┐
 │    DriverManager    │  picks driver for the URL
 └──────────┬──────────┘
 ┌──────────▼──────────┐
 │     JDBC Driver     │  e.g. MySQL Connector/J (Type 4)
 └──────────┬──────────┘
            │  DB protocol
 ┌──────────▼──────────┐
 │   Database (MySQL)  │
 └─────────────────────┘`,
  code: [{ t: '5 steps with PreparedStatement', src: String.raw`import java.sql.*;

public class JdbcDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/company";
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");                       // 1
            Connection con = DriverManager.getConnection(url, "root", "root"); // 2

            PreparedStatement ins = con.prepareStatement(
                    "INSERT INTO Employee (EmpID, Name, Salary) VALUES (?, ?, ?)"); // 3
            ins.setInt(1, 101); ins.setString(2, "Asha"); ins.setDouble(3, 50000);
            ins.executeUpdate();                                               // 4

            ResultSet rs = con.createStatement().executeQuery("SELECT * FROM Employee");
            while (rs.next())
                System.out.println(rs.getInt("EmpID") + " " + rs.getString("Name"));

            con.close();                                                       // 5
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}`}],
  trick: `Steps: <b>"Lazy Cats Sit Eating Cake"</b> → Load, Connect, Statement, Execute, Close.<br>Drivers: <b>1 Bridge, 2 Native, 3 Network, 4 Thin (pure Java)</b>.`,
  quiz: [
    { q: 'Which prevents SQL injection?', o: ['Statement', 'PreparedStatement', 'ResultSet', 'DriverManager'], a: 1, why: 'Parameters are bound as data, never parsed as SQL.' },
    { q: 'Which method runs a SELECT?', o: ['executeUpdate()', 'executeQuery()', 'commit()', 'prepare()'], a: 1, why: 'executeQuery returns a ResultSet.' },
    { q: 'MySQL Connector/J is which driver type?', o: ['Type 1', 'Type 2', 'Type 3', 'Type 4'], a: 3, why: 'Pure Java thin driver.' },
    { q: 'Undo changes after a failure in a transaction:', o: ['con.close()', 'con.rollback()', 'rs.next()', 'ps.clear()'], a: 1, why: 'rollback reverts uncommitted changes.' }
  ]
},
{
  id: 'u2-io', unit: 2, title: 'I/O Streams (Byte vs Character) & Wrapper Classes', marks: '2', mins: 10, pyq: 'Q2 · 2M',
  q: 'Identify two I/O classes from the character stream category and describe their use. <i>(Also: byte vs character stream, wrapper classes, autoboxing.)</i>',
  simple: `<p>A <b>stream</b> is a pipe of data. <b>Byte streams</b> carry raw bytes, like moving sealed boxes (images, audio). <b>Character streams</b> carry letters and know how to read text in any language (Unicode). For text files, use character streams.</p>`,
  learn: [
    { title: 'Byte stream', body: `<p>Reads/writes <b>8-bit bytes</b>. Base classes <code>InputStream</code> / <code>OutputStream</code>. For binary data. <code>FileInputStream</code>, <code>FileOutputStream</code>, <code>ObjectOutputStream</code>.</p>` },
    { title: 'Character stream', body: `<p>Reads/writes <b>16-bit Unicode characters</b>. Base classes <code>Reader</code> / <code>Writer</code>. For text. <code>FileReader</code>, <code>FileWriter</code>, <code>BufferedReader</code>, <code>BufferedWriter</code>, <code>PrintWriter</code>.</p>` },
    { title: 'Wrapper classes', body: `<p>Object versions of primitives: int→<code>Integer</code>, char→<code>Character</code>, long→<code>Long</code>, boolean→<code>Boolean</code>… Needed because collections store only objects.</p>` },
    { title: 'Autoboxing', body: `<p><b>Autoboxing</b>: primitive → wrapper automatically: <code>Integer x = 10;</code><br><b>Unboxing</b>: wrapper → primitive: <code>int y = x;</code><br>Parsing: <code>Integer.parseInt("123")</code>.</p>` }
  ],
  widget: 'ByteVsChar',
  short: `<p>Two character stream classes:</p><ol><li><b>FileReader</b>: reads data from a text file <b>character by character</b> (16-bit Unicode). <code>new FileReader("a.txt")</code></li><li><b>BufferedReader</b>: wraps a Reader and buffers characters for efficient reading; its <code>readLine()</code> reads a whole line at a time.</li></ol><p>(Also: <b>FileWriter</b> writes characters to a file; <b>BufferedWriter/PrintWriter</b> for efficient/formatted writing.) Character streams are used for <b>text</b>; byte streams for binary data.</p>`,
  answer: `<p>A <b>stream</b> is a sequence of data flowing from a source to a destination. Java I/O (<code>java.io</code>) has two kinds of streams.</p>
<table class="tbl"><tr><th>Basis</th><th>Byte Stream</th><th>Character Stream</th></tr>
<tr><td>Unit of data</td><td>8-bit bytes</td><td>16-bit Unicode characters</td></tr>
<tr><td>Base classes</td><td>InputStream, OutputStream</td><td>Reader, Writer</td></tr>
<tr><td>Used for</td><td>Binary: images, audio, video, objects</td><td>Text files</td></tr>
<tr><td>Examples</td><td>FileInputStream, FileOutputStream, BufferedInputStream, ObjectOutputStream</td><td>FileReader, FileWriter, BufferedReader, BufferedWriter, PrintWriter</td></tr>
<tr><td>Encoding</td><td>No character encoding</td><td>Handles encoding automatically</td></tr></table>
<h3>Character stream classes and their use</h3><ul>
<li><b>FileReader</b>: reads characters from a file.</li>
<li><b>BufferedReader</b>: buffered reading; <code>readLine()</code>; faster.</li>
<li><b>FileWriter</b>: writes characters/strings to a file (append mode with <code>true</code>).</li>
<li><b>BufferedWriter</b>: buffered writing; <code>newLine()</code>.</li>
<li><b>PrintWriter</b>: formatted output with <code>println()</code>.</li></ul>
<h3>Wrapper Classes & Autoboxing</h3><p>Wrapper classes convert primitives into objects: byte→Byte, short→Short, int→Integer, long→Long, float→Float, double→Double, char→Character, boolean→Boolean. Needed for collections, utility methods (<code>Integer.parseInt()</code>, <code>valueOf()</code>) and null values.</p>
<p><b>Autoboxing</b>: automatic conversion of primitive to wrapper (<code>list.add(5)</code>). <b>Unboxing</b>: wrapper to primitive (<code>int n = list.get(0)</code>).</p>
<h3>Serialization & Cloning (brief)</h3><p><b>Object serialization</b> writes an object's state as bytes with <code>ObjectOutputStream</code>. <b>Cloning</b> (<code>implements Cloneable</code>, override <code>clone()</code>) creates a copy of an object (shallow by default).</p>`,
  code: [{ t: 'FileWriter + BufferedReader, autoboxing', src: String.raw`import java.io.*;
import java.util.*;

public class IoDemo {
    public static void main(String[] args) throws IOException {
        FileWriter fw = new FileWriter("notes.txt");       // character output
        fw.write("Hello Java\nStreams are easy\n");
        fw.close();

        BufferedReader br = new BufferedReader(new FileReader("notes.txt"));
        String line;
        while ((line = br.readLine()) != null)             // read line by line
            System.out.println(line);
        br.close();

        List<Integer> list = new ArrayList<>();
        list.add(10);                         // autoboxing int -> Integer
        list.add(Integer.parseInt("20"));     // String -> int -> Integer
        int sum = 0;
        for (Integer n : list) sum += n;      // unboxing Integer -> int
        System.out.println("Sum = " + sum);   // 30
    }
}`}],
  trick: `<b>Byte = Binary</b> (Stream suffix: InputStream/OutputStream). <b>Char = Characters</b> (Reader/Writer suffix).<br>If the class name ends in <b>Reader/Writer</b>, it's a character stream.`,
  quiz: [
    { q: 'Which is a character stream class?', o: ['FileInputStream', 'BufferedReader', 'ObjectOutputStream', 'DataInputStream'], a: 1, why: 'Reader/Writer classes are character streams.' },
    { q: 'Integer x = 10; is an example of…', o: ['Unboxing', 'Autoboxing', 'Casting', 'Parsing'], a: 1, why: 'Primitive → wrapper automatically.' },
    { q: 'Best stream for copying an image?', o: ['FileReader', 'FileInputStream', 'BufferedReader', 'PrintWriter'], a: 1, why: 'Images are binary → byte stream.' }
  ]
},
{
  id: 'u2-serial', unit: 2, title: 'Serialization: File-based Employee Management', marks: '10', mins: 20, pyq: 'Q10 · 10M compulsory',
  q: 'Build a Java application that performs file-based employee management (Add, View, Delete) using serialization.',
  simple: `<p>Serialization = <b>freeze-drying</b> an object. Your Employee object lives in RAM and dies when the program ends. Serialization turns it into a <b>stream of bytes</b> saved in a file. Next time, <b>deserialization</b> "adds water" and you get the same object back.</p>`,
  learn: [
    { title: 'Serializable', body: `<p>The class must <code>implements Serializable</code>, a <b>marker interface</b> (no methods). Otherwise Java throws <code>NotSerializableException</code>.</p>` },
    { title: 'Write', body: `<p><code>ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("emp.dat"));</code><br><code>oos.writeObject(list);</code> → <b>serialization</b>.</p>` },
    { title: 'Read', body: `<p><code>ObjectInputStream ois = new ObjectInputStream(new FileInputStream("emp.dat"));</code><br><code>list = (List&lt;Employee&gt;) ois.readObject();</code> → <b>deserialization</b>.</p>` },
    { title: 'transient & UID', body: `<p><code>transient</code> fields (e.g. password) are <b>not saved</b>; they come back as default (null/0). <code>serialVersionUID</code> is a version number that checks the class matches when reading.</p>` },
    { title: 'The app', body: `<p>Keep an <code>ArrayList&lt;Employee&gt;</code>. On start → load it from the file. <b>Add</b> → add to list + save. <b>View</b> → print list. <b>Delete</b> → removeIf(id) + save. <b>Exit</b>.</p>` }
  ],
  widget: 'SerializationDemo',
  answer: `<h3>Serialization</h3><p><b>Serialization</b> is the process of converting an object's state into a <b>byte stream</b> so it can be saved to a file or sent over a network. <b>Deserialization</b> is the reverse: rebuilding the object from the byte stream.</p>
<h3>Key points</h3><ul>
<li>The class must implement <code>java.io.Serializable</code>, a <b>marker interface</b> (no methods).</li>
<li><code>ObjectOutputStream.writeObject()</code> serializes; <code>ObjectInputStream.readObject()</code> deserializes (returns Object → cast).</li>
<li><b>transient</b> variables are not serialized. <b>static</b> variables are not serialized either (they belong to the class).</li>
<li><b>serialVersionUID</b> ensures the sender and receiver have compatible class versions (else <code>InvalidClassException</code>).</li>
<li>If a field's type is not serializable → <code>NotSerializableException</code>.</li></ul>
<h3>Design of the Employee Management application</h3><ol>
<li><b>Employee</b> class (id, name, designation, salary) implements Serializable, with <code>toString()</code>.</li>
<li>File <code>employees.dat</code> stores an <code>ArrayList&lt;Employee&gt;</code>.</li>
<li><b>load()</b>: if the file exists, read the list with ObjectInputStream; else start with an empty list.</li>
<li><b>save()</b>: write the whole list with ObjectOutputStream.</li>
<li>Menu loop with Scanner: <b>1. Add</b> (read details → add → save), <b>2. View</b> (print all), <b>3. Delete</b> (by ID using <code>removeIf</code> → save), <b>4. Exit</b>.</li>
<li>Handle <code>IOException</code> and <code>ClassNotFoundException</code> with try-catch.</li></ol>
<h3>Advantages</h3><p>Persists object state across program runs, simple file storage without a DB, enables sending objects over networks (RMI), deep copy of objects.</p>`,
  diagram: `              SERIALIZATION  writeObject()
  Employee  ─────────────────────────────▶  byte stream  ──▶  employees.dat
  objects   ◀─────────────────────────────  byte stream  ◀──  (file on disk)
              DESERIALIZATION  readObject()

  MENU FLOW
  start → load() list from file
     ├─ 1 Add    → read id,name,desig,salary → list.add(e) → save(list)
     ├─ 2 View   → for (Employee e : list) print(e)
     ├─ 3 Delete → list.removeIf(e -> e.id == id) → save(list)
     └─ 4 Exit`,
  code: [{ t: 'Full program (write this)', src: String.raw`import java.io.*;
import java.util.*;

class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    int id; String name, designation; double salary;
    Employee(int id, String n, String d, double s) { this.id = id; name = n; designation = d; salary = s; }
    public String toString() { return id + " | " + name + " | " + designation + " | " + salary; }
}

public class EmployeeManager {
    static final String FILE = "employees.dat";

    static List<Employee> load() {
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(FILE))) {
            return (List<Employee>) in.readObject();                  // DESERIALIZE
        } catch (Exception e) { return new ArrayList<>(); }           // no file yet
    }

    static void save(List<Employee> list) {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(FILE))) {
            out.writeObject(list);                                    // SERIALIZE
        } catch (IOException e) { System.out.println("Save error: " + e.getMessage()); }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Employee> list = load();
        while (true) {
            System.out.println("1.Add 2.View 3.Delete 4.Exit");
            int ch = sc.nextInt();
            if (ch == 1) {
                System.out.print("ID Name Designation Salary: ");
                list.add(new Employee(sc.nextInt(), sc.next(), sc.next(), sc.nextDouble()));
                save(list);
            } else if (ch == 2) {
                list.forEach(System.out::println);
            } else if (ch == 3) {
                System.out.print("ID to delete: ");
                int id = sc.nextInt();
                System.out.println(list.removeIf(e -> e.id == id) ? "Deleted" : "Not found");
                save(list);
            } else break;
        }
    }
}`}],
  trick: `<b>OOS writes, OIS reads.</b> Serializable = <b>marker</b> (empty) interface. <b>transient = "don't pack this"</b>.`,
  quiz: [
    { q: 'Serializable is a…', o: ['Functional interface', 'Marker interface', 'Abstract class', 'Annotation'], a: 1, why: 'It has no methods; it only marks the class.' },
    { q: 'A transient field after deserialization is…', o: ['Same value', 'Default value (null/0)', 'Exception', 'Random'], a: 1, why: 'transient fields are skipped when writing.' },
    { q: 'Which method deserializes an object?', o: ['writeObject', 'readObject', 'readLine', 'parse'], a: 1, why: 'ObjectInputStream.readObject().' },
    { q: 'Class without Serializable passed to writeObject →', o: ['Works', 'NotSerializableException', 'ClassNotFoundException', 'Compile error'], a: 1, why: 'Only Serializable objects can be written.' }
  ]
}
];

const cards = [
  [2, 'What is the Collection Framework?', 'A unified set of interfaces, classes and algorithms in <code>java.util</code> to store and manipulate groups of objects.'],
  [2, 'List vs Set', 'List: ordered, duplicates allowed, index. Set: unique elements only.'],
  [2, 'Is Map a Collection?', 'No. Map is a separate hierarchy of key → value pairs.'],
  [2, 'ArrayList vs LinkedList (one line)', 'Dynamic array, fast get(i) vs doubly linked list, fast insert/delete.'],
  [2, 'HashMap vs TreeMap (one line)', 'Unordered, O(1), 1 null key vs sorted keys, O(log n), no null key.'],
  [2, 'Thread life cycle states', 'New → Runnable → Running → Blocked/Waiting → Terminated.'],
  [2, '2 ways to create a thread', 'Extend <code>Thread</code> or implement <code>Runnable</code> (preferred).'],
  [2, 'start() vs run()', 'start() creates a new thread then calls run(); calling run() directly runs it in the current thread.'],
  [2, 'join() and sleep()', 'join(): wait for another thread to finish. sleep(ms): pause current thread for a time.'],
  [2, 'Thread priority range', '1 (MIN) to 10 (MAX), default 5 (NORM). Only a hint to the scheduler.'],
  [2, 'What is synchronization?', 'Allowing only one thread at a time into a shared resource using the object\'s lock, preventing race conditions.'],
  [2, 'Race condition', 'Wrong results when multiple threads read/modify shared data at the same time.'],
  [2, 'Lambda syntax', '<code>(params) -> expression</code> or <code>(params) -> { statements }</code>'],
  [2, 'Functional interface', 'Interface with exactly ONE abstract method. Eg: Runnable, Comparator, Predicate.'],
  [2, 'Predicate / Function / Consumer / Supplier', 'test→boolean / apply→R / accept→void / get→T'],
  [2, 'Stream: intermediate vs terminal', 'Intermediate (filter, map, sorted) lazy, return Stream. Terminal (collect, reduce, forEach) produce result.'],
  [2, 'What does reduce do?', 'Combines all elements into one value: <code>reduce(0, (a,b) -> a+b)</code>.'],
  [2, 'JDBC 5 steps', 'Load driver → Get connection → Create statement → Execute query → Close.'],
  [2, '4 JDBC driver types', '1 JDBC-ODBC bridge, 2 Native-API, 3 Network protocol, 4 Thin (pure Java).'],
  [2, 'Statement vs PreparedStatement', 'PreparedStatement is precompiled, uses ?, faster for repeats and prevents SQL injection.'],
  [2, 'executeQuery vs executeUpdate', 'executeQuery: SELECT → ResultSet. executeUpdate: INSERT/UPDATE/DELETE → int rows.'],
  [2, 'Byte vs Character stream', 'Byte: 8-bit, InputStream/OutputStream, binary. Character: 16-bit Unicode, Reader/Writer, text.'],
  [2, 'Two character stream classes', 'FileReader (reads chars from file), BufferedReader (readLine(), buffered). Also FileWriter.'],
  [2, 'Autoboxing / Unboxing', 'int → Integer automatically / Integer → int automatically.'],
  [2, 'Serialization', 'Converting an object into a byte stream (writeObject) to save/send; deserialization = readObject.'],
  [2, 'transient keyword', 'Marks a field to be skipped during serialization.'],
  [2, 'serialVersionUID', 'Version ID that checks the serialized object matches the current class.']
];

export default { topics, cards };
