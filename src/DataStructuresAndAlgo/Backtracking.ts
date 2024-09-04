// Backtracking algorithm

// * useful when:
// 1. Need to find all possible combinations in data structure
// 2. Need to find best combnation from presented data

// Its recursive iteration with optimal solution selection

// Main idea is recursive traversing through all branches of solutions and checking them if they are correct for 
// particular task (рекурсивный перебор всех ветвей решения задачи и проверка их соответствия условию задачи)

// Process starts from initialization and setup of initial state
// THen algorithm start to select next level and check if it satisfies the condition
//! Important aspect of backtracking is determining condition when algorithms should stop work
// It can be achieving some target, end of possible variations, or time limit


// Step 1 - выберем элемент для начального состояния
// Step 2 - проверка, где выбранный элемент удовлетворяет критериям задачи усли успешно то переходим к след шагу
// в противном случае возвращаемся чтобы выбрать другой элемент и повторить проверку. Это позволяет избежать
// потенциального бесконечного цикла и перемешает нас к след возможному варианту
// Step 3 - Откат, представляет собой возврат к предидущему выбору и проверке когда все возможные варианты были
// исчерпаны. Откат может произойти в тех случаях когда текущий выбор не приводит к решению задачи или к моменту
// когда мы исчерпали все возможные варианты. Когда откат происходит мы отменяем текущий выбор и возвращаемся
// к предидущему состоянию алгоритма чтобы попробовать другой путь
// Step 4 - происходит после успешной проверки и выбора. На этом шаге мы пролжаем алгоритм используя текущий
// выбор и двигаясь вперед к нахождению следующего возможного варианта решения задачи. Это шаг может повторяться
// до тех пор пока все возможные комбинации не будут найдены или пока задача не будет решена

// Таким образом эти четыре основные шага - //! выбор проверка откат и продолжение являются ключевыми
// компонентами алгоритма бектрекинг.