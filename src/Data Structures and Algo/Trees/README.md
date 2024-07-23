# Trees like conception

[Hexlet Tree conception](https://ru.hexlet.io/courses/algorithms-trees/lessons/concept/theory_unit)
Trees are hierarchical structures.
Trees are the most important not linear data structures
And they very often occurs in algorithms

## What are trees and what is their purpose

They are use to show hierarchical relationships in computer memory.
They commonly used in Windows register, XML docs, DOM structure, etc.

Tree structure schema tells us, that tree is limited set(конечное множество) which includes
vertexes(вершины) and nodes, and also it has tree root.

Each node contains data and links to another non-overlapping (не пересекающиеся) trees. In this
case each node from which another nodes emanate, (каждый узел от которого исходят другие узлы является корневым)
при этом эти данные образуют поддрево основгоно древа.

Besides hierarchical structures representations trees are also used in:

1. Fast search in sorted data, for examples in indexes without data
2. Clasterization of data: eg in Databases or Machine-learning
3. Resolving of difficult arithmetical tasks. Tree is used to keep order of operations, argument values or intermediate results.
4. Algorithms and decision-making: Decision tree - intellectual instrument of data analysis
5. Networking - for routing and for IP address detection mechanisms with site URL, eg DNS-servers

## Types of nodes, that are presented in trees.

1. Parent node - node which is located in the top level of hierarchy
2. Child node - referenced node from observable node (узел на который есть ссылки из рассматриваемого узла)
3. Root node - node, that has no links from other nodes
4. Sister node - 2 nodes, that have common parents
5. Leaf node, tree leaf or terminal node - node, who has no under-trees (узел у которого нет поддеревьев)
6. Branch node or internal vertex - node that has child structures

   ![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6IjJiZTIwMWFiMDg4Yjg3ZjcxMTZhYTcwZDFmZDhiZDc2LnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=e5d4a5e0314211780a7a38f196cf62eb000f60c5c91e944e89895312fa41e684)

Count of under-trees of node is node degree (количество поддеревьев узла называется степенью)
Максимальное значение степени узла - степень дерева
Если степень дерева равна двум значит у каждого узла может быть не более двух потомков

## Different forms of trees

Because of different types of tasks, developers uses different forms of trees with specific organization of vertexes

1. Ordered Tree (Упорядоченное дерево) - tree, where all vertexes are sorted. It also calls flat, because by sequentially traversing
   the vertexes, a sorted array is obtained (при последовательном обходе вершин получается сортированный масив)

   ![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6IjVjZDZkZTg5ZDBjMjVkNGViOGQ2ZGVhNGU1OWM4ZWRiLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=61f73dab183133a03e3f49ba18693f458ce8401f2f42648922d2b5e18196f16f)

2. Full tree (полное дерево) - tree in which the number of child nodes of each internal vertex is equal to the degree of the tree
   (дерево в котороом количество дочерних узлов у каждой внутренней вершины равно степени дерева)

   ![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6ImYxOGNmMjFlZjIwOTkzN2I4OWI5OWZkODZmMzlhMjU3LnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=96c3dd4cde4855b36ca4d392fe96d0a1a06eda58ea73d508797f372350492be6)

3. Completed Tree (Завершенное дерево) - Tree in which every level besides the last is completed. (count of children equal degree of tree)

   ![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6ImU2ODMyZjc5MmJlYzAxMDZkZGE3MjI3NDBjZGM5ZGZlLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=584440b2654ee428440b6ff9ac68bf4511a30ad396b1bd6ee667aa7934295d79)

4. Ideal Tree (Идеальное дерево) - Full tree, in which all terminal nodes are located in the same level.

   ![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6IjEzNjJmNThiMTk1NmEzMjNhN2IyN2FlZDJlMzRmNWVlLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=d586d28f89154dfa48e0b4ede95c03e9c1e2b6a7b6ee6aebd3411e561d4248dc)

## How trees could look like

To represent hierarchical structures, we use following options:

1. Hierarchical schematic view
2. Circles Of Eiler - круги эйлера
3. Indented Lists - списки с отступами
4. Code

Let's look at each method

1. As the main method of trees representation we use names, vertex indexes or payload of the node. They are connected by lines
   which represents links between vertexes.

   ![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6ImIzNTFkZTgxY2RhNDAxOWY1ZWUwNTM2ODNlNGYwNWZkLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=d0ca68be2684469cda2dad10256bd1e967cf8ad26fc73feee5303b431a5129ad)

2. Eilers Circles - we can represent the tree according to the rules of sets theory with Eilers circles:

   ![alt text](https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6Ijc2YjkyMWNlYjhmOTI2OTFiMmFmYzA1OTNiYjY5OGQyLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=20a0fee407abe83e5282bb8a4e07291425c101beb3a4fcde9b76f0ed66bf3f93)

This is very uncommon method because under-trees usually don't intersect

3. Intended lists: hierarchical relationships we can show also like this, where intention will be representing current level.
   (отступ оюозначает уровень)

4. Code. To work with trees we should be able too store them in computer memory:

```
class BinaryTreeNode {
    constructor(value, parent) {
        this.child1 = null;
        this.child2 = null;
        this.value = value;
        this.parent = parent;
    }
}
```
