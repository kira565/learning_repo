"use strict";
// https://ru.hexlet.io/courses/algorithms-graphs/lessons/in-depth-search/theory_unit
// Depth search или Поиск в глубину
Object.defineProperty(exports, "__esModule", { value: true });
exports.races = void 0;
// Example - flight ticket search site.
// We choose flight date and two cities - departure and arrival
// If there were only direct flights, the algorithm of search would be simple
// But there are cities, that not linked directly and we can get to one city
// only with transfer. Simple algorith cannot find such routes
// So we need something stronger
// We will explore instruments how we can achieve this.
// Список смежности
// Любой граф состоит из вершин и ребер
// в задаче поиска маршрута города - это вершины
// если два города связаны авиасообщением их соединяет ребро
// у каждой вершины есть значение - название города
// У каждой вершины есть значение — это название города. Из каждой вершины выходит несколько ребер, которые удобно хранить в массиве:
var Vertex = /** @class */ (function () {
    // при создании вершины мы сохраняем значение вершины и задаем пустой массив смежных вершин
    function Vertex(value) {
        this.value = value;
        this.adjacesVertices = [];
    }
    // Устанавливает связь с другой вершиной
    Vertex.prototype.addLink = function (vertex) {
        if (!this.isLinked(vertex)) {
            this.adjacesVertices.push(vertex);
            // Не бывает так, что самолеты летают только в одну сторону.
            // Добавляя город Б в список смежности города А, мы должны одновременно добавить А в список смежности Б.
            //Именно так в списках смежности можно хранить неориентированные графы.
            //По сути, мы храним ориентированный граф, вершины которого связаны ребрами, направленными навстречу друг другу,
            vertex.adjacesVertices.push(this);
        }
    };
    // чтобы избеэать повторного добавления уже установленной связи и дублирования вершин делаем проверку на существование связи
    Vertex.prototype.isLinked = function (vertex) {
        return this.adjacesVertices.includes(vertex);
    };
    return Vertex;
}());
// Написанный нами код уже можно использовать, чтобы хранить информацию об авиасообщениями между городами:
var city1 = new Vertex("Nicosia");
var city2 = new Vertex("Tokyo");
city1.addLink(city2);
console.log(city2.isLinked(city1)); // -> true
// Graph Creation
// We wont work with vertexes, but with Graph, so lets create Graph
var Graph = /** @class */ (function () {
    function Graph() {
        this.vertices = [];
    }
    Graph.prototype.getVertex = function (value) {
        return this.vertices.find(function (x) { return x.value === value; });
    };
    // Добавляет в граф новую вершину с заданным значением и пустым списком смежности
    // Перед этим проверяем нет ли в списке уже существующей вершины с таким же значением
    // так мы можем отличать вершины друг от друга
    Graph.prototype.addVertex = function (value) {
        if (this.getVertex(value) === undefined) {
            this.vertices.push(new Vertex(value));
        }
    };
    // Добавлят ребро между вершинами пользуясь двумя этими методами addVertex and AddEdge мы можем построить граф
    Graph.prototype.addEdge = function (value1, value2) {
        var vertex1 = this.getVertex(value1);
        var vertex2 = this.getVertex(value2);
        if (vertex1 !== undefined && vertex2 !== undefined) {
            vertex1.addLink(vertex2);
        }
    };
    return Graph;
}());
var graph = new Graph();
graph.addVertex("Nicosia");
graph.addVertex("Dubai");
graph.addVertex("Beijing");
graph.addVertex("Tokyo");
graph.addVertex("Osaka");
graph.addVertex("Kyoto");
graph.addVertex("Fukuoka");
graph.addEdge("Nicosia", "Dubai");
graph.addEdge("Dubai", "Beijing");
graph.addEdge("Beijing", "Tokyo");
graph.addEdge("Tokyo", "Osaka");
graph.addEdge("Tokyo", "Kyoto");
graph.addEdge("Tokyo", "Fukuoka");
exports.races = graph.getVertex("Tokyo");
