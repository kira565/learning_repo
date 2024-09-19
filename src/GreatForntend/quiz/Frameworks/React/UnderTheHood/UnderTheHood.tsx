//@ts-nocheck
// * UNDER THE HOOD REACT
// * ITS A DEEPER EXPLAINATION OF DOC <RenderAndCommit>, where
//* 3 phases described:
//1. triggering a render
//2. rendering the component
//3. commiting to the DOM

//! NOTE: VirtualDOM это очень старое понятие которое вводит
//! в заблуждение, даже дом по хорошему есть не везде. Поэтому
//! нужно отойти от него

//? HOW INTERFACE RENDERS

//?There are two phases:

// todo 1 RENDERING AND RECONCILIATION

// * Initial Render
// All begins from element, when we run our application,
// all JSX from components is changing to React.CreateElement()
// and after that, //! ELEMENT TREE IS CREATED

//! THIS IS NOT A SINGLE TREE
//! there are also TREE OF FIBERS (not a tree in reality)
// It has the same node cound as element tree,

// While initial rendering, for every element node, we create
// a fiber node.
//! FIBER NODE keeps ref to element, its state, props, and other
//! important information

//! Fiber node UNLIKE React Element is mutable:
// it knows by which function this element created, props he had before, etc

//! FIBER LIVES FOREVER UNTIL ELEMENT DESTROY
//! ELEMENT CONSTANTLY RECREATES, FIBER ONLY CHANGE ITS REF TO
//! CORRESPONDING ELEMENT (WHEN RE-RENDER)
//! 1 fiber per lifecycle

//! Файбер создается при создании элемента и уничтожается при уничтожении элемента
//! При ререндере файбер не разрушается а хранит всю метадату елемента (просто меняется ссылка)
//! элемент же пересоздается

//! Fiber tree is not tree - it is LINKED LIST
// Because its convinient to navigate between fibers

// Here are 3 types of //*relationships between nodes:

// 1 Parent ---> 1st Child
// 2 any Child ---> Parent
// 3 Child ---> next Child
// Fiber is JS object

type Fiber = {
  stateNode: unknown;
  memoizedProps: unknown;
  memoizedState: unknown;
  child: Fiber;
  return: Fiber;
  sibling: Fiber;
  sideEffects: any[]; // Work
};

//? Head of fiber Linked List is HOST ROOT node

//! Work
// Inside nodes we keep work that need to be done

// During Initial render almost all fiber nodes are loaded with work

//* WORK (Effects) What is it?
// work is side effects (data fetch, subscriptions, manual DOM changes)

// All effects are linked to each other, we have //? List of effects

//sideEffects: [work, work, work, work] *doJob() => effect.nextEffect()
// side effects have different //? priority
// eg animation has big priority (and other tasks related what user sees now)

//? effects its what is needed to do to make from old interface - new one

// * Update (re-renders) (rendering and reconcilation)
// We have current Fiber tree.
// 1 re-render happens in some of the nodes - state change, parent re-render
// 2 node marked with special status (update require)
// 3 We need new Fiber Tree:
//? This new tree calls WorkInProgress tree, it creates like this:
//4 React starting traverse old tree and clone nodes that didnt change to a new tree
//5 when it finds a fiber node which has some side-effects(work) to do, react add this job to the list
//6 after traversal react create list and prioritize effect list items
//7 when traversal completed, WorkInProgressTree becomes a current tree, and old tree is removing
//! Note: Sometimes effects list could be empty during re-render (eg click but nothing happens)
//! so we can have updates without effects

//!Note2: Process of rendering and reconciliation can be canceled or paused:
// when we build a WIP tree, browser can pause this proccess if its busy by another tasks,
// in this case react save traversal progress, and continue later if it is still actual
// he saves next fiber node to special variable: //?nextUnitToWork
// If uncompleted WIP tree is not actual anymore, its easier to start from begining
//? how react understand that browser has no resources for rendering and reconcilation?
//* with special method requestIdleCallback react make this request to browser

// Algorithm WIP Tree Building
// O(n^3) - is basic complexity while building WorkAndProgressTree
// this is really slow, so there are some optimisations by React Team:
// 1. When one node has another type(eg was Component1 became Component2) ofcourse algorithms
// stop next work with old comp children, it destroys old fiber node and element, and create new one
// its simplyfies complexity sigficantly
// 2. //? KEYS can be used for elements, they are defined by developer and they really
//? help React to understand which elements are same and which are not its also simplify
// algorithm of rendering and reconcilation
//* After optimisations complexity is O(n)

// todo PHASE 2 COMMIT
// We have prioritized effects array from previous phase
// We need to do these effects.
// But it should be done smartly, to provide smoothness
// Нужно уложить их таким образом чтобы по 16 мс кадры обновлялись, so
//! 16ms interval - do effects, then update, and again
//! NOTE: This phase cannot be canceled or interrupted

//! IMPORTANT: This task contains two parts (выполняется в два подхода)
//! First effects related to DOM creation then effects related to actual DOM interactions
//! Because some effects from part2 need actual DOM, SO
//! 1. PERFORM DOM CHANGES
//! 2. PERFORM ALL OTHER EFFECTS
// Вначале эффекты для построения дома а потом остальные которые могут содержать интеракции с домом
//

//? краткий пересказ по русски
// при старте строится дерево реакт элементов в первые для каждого элемента создается файбер нода
// файбер нода изменяет свое состояние и ссылки реакт елементы иммутабельны и создаются новые
// строится дерево файберов (линк лист)
// каждая нода знает какую работу ей сделать чтобы отобразить в браузере мы собираем действия
// стриом список действий переносим в фазу коммита после чего в браузере и отображаем

//если пользователь чтото делает
// файбер нода помечается как файбер нода требующая работы изменений реакт идет по дереву
// файберов клонирует ноды и строит новое дерево как только он доходит до помеченого элемента
// он делает эти изменения и смотрит на что они повлияли какую работу надо сделать чтобы поменять
// картинку в браузере он собирает эти иэменения  и отдает их в следующую фазу коммита

//? хуки завязаны на том как работает файбер и стали возможны после файбера

//? What is the main goal of React Fiber?
// The goal is to increase suitability for areas like anumation, layout. Its headline
// feature us uncremental rendering: the ability to split rendering works into chunks
// and spread it out over multiple frames

//? what is reconciliation
// Reconciliation is the proccess through which React updates the Browser DOM and makes
//
