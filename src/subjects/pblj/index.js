import unit1 from './unit1';
import unit2 from './unit2';
import unit3 from './unit3';
import DG from './diagrams';
import REV from './revise';
import BHAI from './bhai';
import BHAI_LEARN from './bhaiLearn';
import MEMES from './memes';
import MEME_IMG from './memeImages';
import GAALI from './gaali';
import { basicsTopic, basicsCards, glossary } from './basics';

export default {
  units: { 0: 'Start here', 1: 'Core Java', 2: 'Advanced Java & JDBC', 3: 'Spring, REST & Web' },

  hero: {
    eyebrow: 'Theory exam · 60 marks',
    title: "Tonight's plan for PBLJ",
    titleBhai: 'Aaj raat ka plan: PBLJ',
    titleGaali: 'Aaj raat PBLJ phodna hai',
    textGaali: 'Zero se shuru kar raha hai? Koi na, pehle bhi yahi kiya tha. List upar se neeche follow kar. Har topic samajh, steps click kar, simulator se khel, exam wala answer padh, tick kar aur aage badh. Reels baad mein dekhna.',
    textBhai: 'Zero se shuru kar rahe ho? Koi baat nahi. List ko upar se neeche follow karo. Har topic mein pehle simple bhasha mein samjho, steps click karo, simulator se khelo, phir exam wala answer padho. Tick karo aur aage badho.',
    text: "Starting from zero is fine. Go down the list in order. For each topic, get the idea, click through the steps, play with the simulator, then read the answer you'll write. Tick it off and move on."
  },

  pattern: {
    title: 'Paper pattern · 60 marks · theory',
    note: "Taken from last year's paper and the question bank. Unit 3 (Spring, JPA, Servlet/JSP) carries the most marks (~28).",
    boxes: [['5 × 2', 'Section A · definitions, all compulsory'], ['4 × 5', 'Section B · explain + short program'], ['3 × 10', 'Section C · 2 compulsory + 1 of 2']]
  },

  plan: [
    {
      title: "Start here: Java from zero",
      time: "≈ 15 min",
      why: "New to Java? This explains class, object, method and the other basic words in plain language. Everything after this will make sense.",
      ids: ["u0-basics"]
    },
    {
      title: "Last year's questions",
      time: '≈ 3 hrs',
      why: "These 11 topics cover every question from last year's paper, and CU papers repeat a lot. Do these first, starting with the compulsory 10-mark ones.",
      ids: ['u2-serial', 'u3-jsp', 'u3-bank', 'u1-overload', 'u2-sync', 'u3-servlet', 'u3-layered', 'u1-jvm', 'u2-io', 'u3-jpa', 'u3-ioc']
    },
    {
      title: 'Your important-questions list',
      time: '≈ 3 hrs',
      why: 'Everything else on your list. Short on time? For each topic, do the 30-second idea, the exam answer and the diagram only.',
      ids: ['u1-exception', 'u1-custom', 'u1-oop', 'u1-inherit', 'u1-access', 'u2-thread-life', 'u2-collections', 'u2-al-ll', 'u2-hm-tm', 'u2-lambda', 'u2-stream', 'u2-jdbc', 'u3-annot', 'u3-rest', 'u3-patterns']
    }
  ],

  tips: [
    '<b>2 marks:</b> definition in 2–3 lines + one example or keyword. 5–6 lines max.',
    '<b>5 marks:</b> definition → 4–5 explained points (or a comparison table) → a short code snippet or diagram.',
    '<b>10 marks:</b> introduction → <b>diagram</b> → explanation under headings → short code → advantages → one-line conclusion.',
    '<b>"X vs Y" questions:</b> always draw a table with 6–8 rows. Easy marks.',
    'Always draw the diagram, even a rough one. It often carries 2–3 marks by itself.',
    "Forgot the full program? Write the class skeleton, the key annotations/methods and comments. Partial code still scores. Never leave a question blank.",
    'Underline keywords (<i>bytecode, platform independent, @Transactional, rollback, serialization, IoC</i>). Examiners skim for them.'
  ],

  pyq: [
    { title: 'Section A · 5 × 2 = 10 marks · all compulsory', items: [
      [1, 'Describe the bytecode concept and its relevance to the JVM.', 2, 'u1-jvm'],
      [2, 'Identify two I/O classes from the character stream category and describe their use.', 2, 'u2-io'],
      [3, 'Identify the function of HttpServletRequest in handling form input.', 2, 'u3-servlet'],
      [4, 'Describe the purpose of @Entity and @Table annotations.', 2, 'u3-jpa'],
      [5, 'Define the concept of Inversion of Control (IoC) in Spring.', 2, 'u3-ioc']] },
    { title: 'Section B · 4 × 5 = 20 marks · all compulsory', items: [
      [6, 'Write a Java program that demonstrates method overloading. Explain how the compiler distinguishes between overloaded methods.', 5, 'u1-overload'],
      [7, 'Demonstrate multithreading in Java by creating two threads, one to print even numbers and the other odd numbers from 1 to 20. Explain how thread priority works in Java.', 5, 'u2-sync'],
      [8, "Apply HttpServletRequest and HttpServletResponse by creating a servlet that receives a student's name and displays a welcome message.", 5, 'u3-servlet'],
      [9, 'Demonstrate how Spring and Hibernate work together in a layered architecture using annotations. Focus on service, DAO and controller layers.', 5, 'u3-layered']] },
    { title: 'Section C · 3 × 10 = 30 marks · Q10 & Q11 compulsory, then Q12 OR Q13', items: [
      [10, 'Build a Java application that performs file-based employee management (Add, View, Delete) using serialization.', 10, 'u2-serial'],
      [11, 'Develop a JSP-based Student Attendance Portal where data is saved to a database using Servlets and JDBC.', 10, 'u3-jsp'],
      [12, 'Evaluate the use of JSP in dynamic web page development. Discuss scriptlets, declarations, directives, include tag and expression language. Justify how they enhance reusability.', 10, 'u3-jsp'],
      [13, 'Create a Spring-Hibernate based banking system that allows users to transfer funds between accounts with transaction management.', 10, 'u3-bank']] }
  ],

  // Mock-test question bank (section -> [question, topic id])
  mock: {
    A: [
      ['Describe the bytecode concept and its relevance to the JVM.', 'u1-jvm'],
      ['Differentiate between public, private and protected access specifiers.', 'u1-access'],
      ['List four differences between C++ and Java.', 'u1-access'],
      ['Differentiate between throw and throws with an example.', 'u1-exception'],
      ['Distinguish between checked and unchecked exceptions.', 'u1-exception'],
      ['Identify two character stream classes and describe their use.', 'u2-io'],
      ['Explain autoboxing and unboxing with a two-line example.', 'u2-io'],
      ['Differentiate between ArrayList and LinkedList.', 'u2-al-ll'],
      ['List the states of the thread life cycle and the purpose of join() and sleep().', 'u2-thread-life'],
      ['Define Inversion of Control and name the three types of Dependency Injection.', 'u3-ioc'],
      ['Describe the purpose of @Entity, @Table, @Id and @GeneratedValue.', 'u3-jpa'],
      ['Identify the function of HttpServletRequest in handling form input.', 'u3-servlet'],
      ['Differentiate between @Component, @Service and @Repository.', 'u3-annot'],
      ['What is a functional interface? Give an example.', 'u2-lambda']
    ].map(([q, id]) => ({ q, id })),
    B: [
      ['Write a program demonstrating method overloading. Explain how the compiler resolves overloaded methods.', 'u1-overload'],
      ['Write a program to create a custom exception AgeException and handle it.', 'u1-custom'],
      ['Explain the four access modifiers with a comparison table.', 'u1-access'],
      ['Create two threads printing even and odd numbers from 1 to 20. Explain thread priority.', 'u2-sync'],
      ['Differentiate between HashMap and TreeMap.', 'u2-hm-tm'],
      ['Explain lambda expressions and functional interfaces with a program.', 'u2-lambda'],
      ['Compare the four JDBC driver types and write the connection steps using PreparedStatement.', 'u2-jdbc'],
      ['Explain the servlet lifecycle and write a servlet that displays a welcome message for a submitted name.', 'u3-servlet'],
      ['Demonstrate how Spring and Hibernate work together in a layered architecture.', 'u3-layered'],
      ['Explain the Spring annotations @Component, @Service, @Repository, @Autowired, @Configuration and @Bean.', 'u3-annot'],
      ['Explain the Singleton and Factory design patterns with code.', 'u3-patterns'],
      ['Explain thread synchronization with a program. Discuss advantages and disadvantages.', 'u2-sync']
    ].map(([q, id]) => ({ q, id })),
    C: [
      ['Build a Java application for file-based employee management (Add, View, Delete) using serialization.', 'u2-serial'],
      ['Develop a JSP-based Student Attendance Portal that saves data to a database using Servlets and JDBC.', 'u3-jsp'],
      ['Create a Spring-Hibernate banking system to transfer funds between accounts with transaction management.', 'u3-bank'],
      ['Explain the four pillars of OOP with a Banking or Employee Payroll application.', 'u1-oop'],
      ['Explain exception handling using try, catch, finally, throw and throws with the exception hierarchy.', 'u1-exception'],
      ['Explain the Collection Framework hierarchy and discuss ArrayList, LinkedList, HashSet and HashMap.', 'u2-collections'],
      ['Explain the thread life cycle with a diagram and the two ways to create a thread.', 'u2-thread-life'],
      ['Explain the Stream API (filter, map, sorted, reduce) with programs.', 'u2-stream'],
      ['Explain JDBC architecture and the steps to connect to a database. Differentiate Statement and PreparedStatement.', 'u2-jdbc'],
      ['Explain IoC and Dependency Injection in Spring with constructor, setter and field injection.', 'u3-ioc'],
      ['Explain the four JPA relationship mappings with examples.', 'u3-jpa'],
      ['Develop a Spring Boot REST controller for Student CRUD.', 'u3-rest'],
      ['Explain the features of Java and the architecture of JVM, JRE and JDK with a diagram.', 'u1-jvm'],
      ['Explain the types of inheritance in Java. How does Java achieve multiple inheritance?', 'u1-inherit']
    ].map(([q, id]) => ({ q, id }))
  },

  topics: [basicsTopic, ...unit1.topics, ...unit2.topics, ...unit3.topics].map(t => ({ ...t, dg: DG[t.id], rev: REV[t.id], bhai: BHAI[t.id], bhaiLearn: BHAI_LEARN[t.id], gaali: GAALI[t.id], meme: MEMES[t.id] && { ...MEMES[t.id], img: MEME_IMG[t.id] } })),
  cards: [...basicsCards, ...unit1.cards, ...unit2.cards, ...unit3.cards],
  glossary
};
