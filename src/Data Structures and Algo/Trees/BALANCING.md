#Balancing
#Балансировка

Trees have very flexible structures. Same set of values we can represent as tree if we will use different
topological methods. Like this two trees with the save values can be completely different
for example in complexity of search.

Because scientists were excited about optimizations of trees, and they wanted to provide
maximum speed of search, balanced trees were invented.

## Balanced trees

Perfect Balance (Идеальная сбалансированность) - property of tree when all levels (maybe except the last one) are full;
For example lets see on these 2 trees with same dataset 1,2,3,4,5,6.
![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6IjEzZmI0YWEyMDM2OWI2OWMxYWMwZDk4Y2IxNzYxMGI5LnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=232a84211e4e6b6c40eee8c2eae0fb13152a59be0fcfdf642d7c6f49fbae810e)

In tree B all levels except last is completed. This means this tree is Perfectly balanced, unlike tree A.
These trees can be classified as Binary trees of search.

In the worst case of search operation, in tree A, its need to perform 6 operations, and in tree B only 3.
Tree with maximal possible height we can classify as disbalanced tree (Разбалансированное или вырожденное)
It is no different from linked list, so it loses the key advantage - speed of search.

Search for disbalanced trees - O(N)
Search for balanced tress - O(log N) ;за количество шагов не превышающее высоту дерева

Balanced state is very hard to maintain. Any insertion or removing of node can affect it.

Let's look on inserting of additional node 7 to our tree. It can be done by 2 ways

![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6IjRmOGFlNmU1MTc5ODVhOGJlNTBhNTg3NjMxZGZmYTdjLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=c2e1a6fa9d10c680485030007625ed368e905ad890187da1fea971fab2bec0d5)

In case B tree becomes disbalanced, because 2 bottom levels are not completed.
In case A, elements were re-arranged to save balance state of the tree.

In such little cases it can be not really critical, but for trees with a million nodes It's very significant to keep tree balanced,

## AVL - tree

AVL tree is different type of trees.
Its perfectly balanced if for every node height of both subtrees are different not more than 1.
АВЛ-дерево считается сбалансированным, если для каждого узла дерева высота его правого и левого поддеревьев отличаются не более чем на единицу. Если модификация структуры узлов приводит к нарушению сбалансированности дерева, то необходимо выполнить его балансировку.

Search in AVL tree is the same as in Binary
При этом благодаря поддержке возможности ребалансировки при вставки и удалении узлов в АВЛ-деревьях есть особенности реализации.

В качестве индикатора наличия разбалансированности в поддереве на узел выносят показатель баланса, который принимает значения от -1 до +1. Их значения:

–1 — в правом поддереве больше высота
0 — поддеревья равной высоты
+1 — высота больше в левом поддереве

В итоге код нашего узла принимает следующий вид:

```
class AvlTreeNode {
  constructor(value, parent) {
    this.left = null; //ссылка на левый дочерний узел
    this.right = null; //ссылка на правый дочерний
    this.balanceFactor = 0; //показатель сбалансированности
    this.parent = parent; //ссылка на родителя
    this.value = value; //полезная нагрузка
  }
}
```

The search operation for this tree we can take from binary tree of search but
insertion and deletion will be different
Операцию поиска можно переиспользовать из бинарных деревьев поиска, а изменение в структуре дерева потребует дополнительной частичной ребалансировки.

## Modification of node structure

Add new vertex we can by performing recursive descent to the place of pasting on the new node.
Добавить новую вершину можно с помощью рекурсивного спуска к месту вставки нового узла. Если возвращаться к корневой вершине через каждый промежуточный узел, то добавивший новую вершину метод модифицирует значение balanceFactor. Если новое значение выходит из допустимого диапазона, то выполняется ребалансировка данного поддерева.

Ребалансировка деревьев осуществляется при помощи специальных механизмов — методов вращения. Вращения бывают двух видов: левое и правое.
Вращение вправо выполняется за три шага:

1. Текущий корень поддерева (D) заменяется на левый дочерний узел (B)
2. Предыдущий корень (D) становится правым дочерним узлом для (B)
3. Предыдущее правое поддерево узла (B) становится левым поддеревом для (D)

![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6ImVkYTY3YzU1ZDUxNTY5OWEyMmY2YjhjZmVmMmM1NzY2LnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=bb57d4c61f8dc17e29524d03ebc58135898a52fc8054fcea7718defb69779f63)

Вращение влево выполняется аналогично:

1. Текущий корень поддерева (D) заменяется на правый дочерний узел ©
2. Предыдущий корень (D) становится левым дочерним узлом для ©
3. Предыдущее левое поддерево узла © становится правым поддеревом для (D)

   ![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6ImVkYTY3YzU1ZDUxNTY5OWEyMmY2YjhjZmVmMmM1NzY2LnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=bb57d4c61f8dc17e29524d03ebc58135898a52fc8054fcea7718defb69779f63)

В зависимости от того, куда добавили новую вершину, возможны различные комбинации выполнения вращений. Они помогут вернуть дерево в сбалансированное состояние.
Всего выделяется четыре варианта развития событий:

1. Левое поддерево левой дочерней вершины
2. Левое поддерево правой дочерней вершины
3. Правое поддерево левой дочерней вершины
4. Правое поддерево правой дочерней вершины

Let's look at 1st case - inserting to the left subtree of the left child vertex.
These triangles represent balanced AVL-trees. They can contain a big amount of vertexes
Vertex B has disbalanced tree, because subtree A1 two levels higher than B2.
![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6ImNiZjI1N2M1YjhlYTFkNTYzZTFkNTYzZDgwNjAzOGYwLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=64e0d51af8683daa27c19f5a6255e864d25859284d8a9e3ce96d2afd4b3190f3)

To balance the tree we need to perform right rotation. Change B to A, make A2 left subtree of the B
Чтобы сбалансировать дерево, необходимо совершить правое вращение — заменить вершину В вершиной А и сделать поддерево А2 левым поддеревом вершины В. После такого преобразования наше поддерево примет следующий вид:

![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6IjkxM2NmN2UyMTAwNjVmYjMwNGEwYjc3ZGNjMzY3NTJmLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=11a385aeb88b86a9e7247e1202ef8c7bc95c6fee5b2381b3f1e1f096e2eda7eb)

4 case will be the same, 1 exception is using left rotation.
Четвертый сценарий будет выглядеть аналогично кроме замены способа вращения на левое.

Для второго и третьего сценариев необходимо выполнить вращение дважды:
![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6IjQ2MTQyZjdiNTc1OGY1MmVjOTI0OTJmNTM5Njg3YWEzLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=ee6b4e5cc239f98d59d50bf33f5416d4d4ad326aeab44d1e2142add54285601a)

Удаление узлов также осуществляется при помощи механизмов вращения. При возврате во время рекурсивного спуска осуществляется вычисление balanceFactor. Если он отклоняется от допустимых значений, то выполняется ребалансировка аналогично добавлению узла.
![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6ImQxNjU2YWY2YWJjNzUzNWM5ODBiNGFjZjQzOWY5NmRkLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=2197831a6d6d0ead2d160e5cbafdd54bc132cea0398d859b266e8824a20a1570)

Другим видом автоматически балансирующихся деревьев являются красно-черные деревья, с которыми мы познакомимся дальше.

## Красно-черные деревья (Red-black trees)

Красно-черные деревья — одни из наиболее активно используемых на практике самобалансирующихся деревьев. Они так называются из-за наличия на узле дополнительного поля, в котором размещается цвет узла. В качестве стандартных цветов используют обычно красные и черные узлы, а сам цвет узла используется во время балансировки.

Так как красно-черные деревья самобалансирующиеся, то среднее и худшее время поиска тоже составляют O(log N). А операции вставки и удаления узла могут потребовать поворот поддерева.

Для красно-черного дерева наш код узла примет следующий вид:

```
class RBTreeNode {
  constructor(value, parent) {
    this.left = null; //ссылка на левый дочерний узел
    this.right = null; //ссылка на правый дочерний
    this.isRed = false; //цвет узла. Если не красный, то считаем что узел черный
    this.parent = parent; //ссылка на родителя
    this.value = value; //полезная нагрузка
  }
}
```

В отличие от других видов деревьев в листовых узлах красно-черных деревьев не хранят полезную нагрузку. А цвет листовых узлов без данных всегда считается черным. Такая особенность позволяет считать ссылку на null валидным узлом. Эта особенность позволит сэкономить память. А само дерево принимает следующий вид:
![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6Ijg4NTNlNGY5MTNlMzVmYzE4YmNiYjA1OTA2NjhjNDJmLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=b5aa589d789f65820d3177af47a4ef15599dc46bd737f5f4bfccf61253ed304f)

Помимо особенностей работы с листовыми узлами к свойствам красно-черного так же относят:

1. Корень красно-черного дерева черный
2. Две красные вершины не могут идти подряд ни на одном пути. Оба потомка каждого красного узла — черные
3. Для каждой вершины, в каждом исходящем из нее пути, одинаковое число черных вершин

Иногда при работе с узлами красно-черного дерева используют черную высоту — количество черных вершин на исходящих из нее путях, не включая саму исходную вершину.

Чтобы вставить узел, мы сначала ищем в дереве место, куда его следует добавить. Новый узел всегда добавляется как лист, поэтому оба его потомка являются пустыми узлами и предполагаются черными. После вставки красим узел в красный цвет. Далее смотрим на предка и проверяем, не нарушается ли свойства дерева, которые описали выше. Если необходимо, мы перекрашиваем узел и производим поворот, чтобы сбалансировать дерево.

Сбалансированность этих деревьев хуже, чем у АВЛ-деревьев. При этом затраты на поддержание состояния сбалансированности и потребление памяти меньше, а операцию поиска можно выполнять одновременно с выполнением перестроения дерева.

Благодаря этим преимуществам сфера применения красно-черных деревьев существенно шире. Так, например, в стандартной библиотеке шаблонов языка C++ STL и TreeMap в Java применяются именно красно-черные деревья.
