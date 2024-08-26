// https://ru.hexlet.io/courses/algorithms-graphs/lessons/in-depth-search/theory_unit
// Depth search или Поиск в глубину

import { Stack } from "../StackAndQueue";

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

class Vertex<T> {
  // класс вершина хранит свою вершину и массив ссылок на соседние вершины
  value: T;
  adjacesVertices: Vertex<T>[]; //Смежные вершины

  // при создании вершины мы сохраняем значение вершины и задаем пустой массив смежных вершин
  constructor(value: T) {
    this.value = value;
    this.adjacesVertices = [];
  }

  // Устанавливает связь с другой вершиной
  addLink(vertex: Vertex<T>) {
    if (!this.isLinked(vertex)) {
      this.adjacesVertices.push(vertex);
      // Не бывает так, что самолеты летают только в одну сторону.
      // Добавляя город Б в список смежности города А, мы должны одновременно добавить А в список смежности Б.
      //Именно так в списках смежности можно хранить неориентированные графы.
      //По сути, мы храним ориентированный граф, вершины которого связаны ребрами, направленными навстречу друг другу,
      vertex.adjacesVertices.push(this);
    }
  }
  // чтобы избеэать повторного добавления уже установленной связи и дублирования вершин делаем проверку на существование связи
  isLinked(vertex: Vertex<T>) {
    return this.adjacesVertices.includes(vertex);
  }
}
// Написанный нами код уже можно использовать, чтобы хранить информацию об авиасообщениями между городами:
const city1 = new Vertex("Nicosia");
const city2 = new Vertex("Tokyo");

city1.addLink(city2);
console.log(city2.isLinked(city1)); // -> true

// Graph Creation
// We wont work with vertexes, but with Graph, so lets create Graph

export class Graph<T> {
  vertices: Vertex<T>[] = [];

  getVertex(value: T) {
    return this.vertices.find((x) => x.value === value);
  }

  // Добавляет в граф новую вершину с заданным значением и пустым списком смежности
  // Перед этим проверяем нет ли в списке уже существующей вершины с таким же значением
  // так мы можем отличать вершины друг от друга
  addVertex(value: T) {
    if (this.getVertex(value) === undefined) {
      this.vertices.push(new Vertex(value));
    }
  }
  // Добавлят ребро между вершинами пользуясь двумя этими методами addVertex and AddEdge мы можем построить граф
  addEdge(value1: T, value2: T) {
    const vertex1 = this.getVertex(value1);
    const vertex2 = this.getVertex(value2);

    if (vertex1 !== undefined && vertex2 !== undefined) {
      vertex1.addLink(vertex2);
    }
  }

  public dfs(start: T, end: T) {
    // - depth first search - поиск в глубину
    const visited: T[] = [];
    const routes: string[] = [];

    this._recursiveDepthFirstSearchRecursive(start, end, visited, routes);
    return routes;
  }

  private _recursiveDepthFirstSearchRecursive(
    current: T, // значение текущей вершины
    end: T, // значение конечной вершины
    visited: T[], // сюда складываем все посещенные вершины в нашем случае массив названий городов который мы заджойним в конце
    routes: string[] // не только входной но и выходной сюда мы складываем найденные маршруты когда рекурсивный метод обойдет граф
    // тут окажутся все маршруты
  ) {
    visited.push(current); // помещаем текущую вершину

    if (current === end) {
      const route = visited.join("-"); // Если значение текущего совпадает с коцном маршрута джойним массив и получаем пример Никосия-Пекин-Осака
      routes.push(route); // Фигачим в массив найденых маршрутов
    } else {
      const neighbours = this.getVertex(current)!.adjacesVertices;
      for (let i = 0; i < neighbours.length; i++) {
        // внутри цикла мы перебираем все соседние вершины и также заходим в них
        const next = neighbours[i].value;
        if (!visited.includes(next)) {
          // если какая то вершина есть в массиве визитед мы ее пропускаем
          // в противном случае мыделаем ее текущей и проваливаемся дальше в рекурсию
          this._recursiveDepthFirstSearchRecursive(next, end, visited, routes);
        }
      }
    }
    visited.pop(); // удаляем вершину ее надо удалять когда мы откатываемся назад по маршруту так как в другой ветке мы тоже можем попасть в тот же
    //город но только другим путем
  }
  //Любой рекурсивный алгоритм можно преобразовать в итеративный. В некоторых случаях реализация оказывается простой
  //, но при обходе графа нам придется складывать вершины в стек.
  public iterativeDepthFirstSearch(startVal: T, endVal: T) {
    const start = this.getVertex(startVal);
    if (!start) {
      return [];
    }

    const routes = [];
    const vertices = new Stack<{ current: Vertex<T>; visited: T[] }>(); // в стек мы складываем вершины для обхода
    vertices.push({ current: start, visited: [] }); // перед циклом помещаем туда начальную вершину из которой строим маршрут

    while (!vertices.isEmpty()) {
      const top = vertices.pop(); // в цикле снимаем очередную вершину
      const { current, visited } = top!;
      visited.push(current.value);

      if (current.value === endVal) {
        // проверям не является ли она конечной вершиной
        const route = visited.join("-"); // если является получаем из тех что посетили джойн маршрут
        routes.push(route); // и добавляем в результирующий массив
      } else {
        // если вершина является промежуточной
        for (let i = 0; i < current.adjacesVertices.length; i++) {
          // обходим все смежные вершины
          const next = current.adjacesVertices[i]; // следующая вершина
          if (!visited.includes(next.value)) {
            // провреям не посещали ли мы ее
            vertices.push({ current: next, visited }); // если нет добавляем в стек
            // в стеке могут храниться одновременно десятки вершин у каждой будут свои посещенные вершины
            // чтобы они не путались мы в стеке храним как вершину так и массив посещенных вершин
          }
        }
      }
    }

    return routes;
  }
}

export const flightRoutesGraph = new Graph();

flightRoutesGraph.addVertex("Nicosia");
flightRoutesGraph.addVertex("Dubai");
flightRoutesGraph.addVertex("Beijing");
flightRoutesGraph.addVertex("Tokyo");
flightRoutesGraph.addVertex("Osaka");
flightRoutesGraph.addVertex("Kyoto");
flightRoutesGraph.addVertex("Fukuoka");
flightRoutesGraph.addVertex("Roma");

flightRoutesGraph.addEdge("Nicosia", "Dubai");
flightRoutesGraph.addEdge("Dubai", "Beijing");
flightRoutesGraph.addEdge("Roma", "Beijing");
flightRoutesGraph.addEdge("Roma", "Dubai");
flightRoutesGraph.addEdge("Nicosia", "Roma");
flightRoutesGraph.addEdge("Beijing", "Tokyo");
flightRoutesGraph.addEdge("Beijing", "Osaka");
flightRoutesGraph.addEdge("Dubai", "Osaka");
flightRoutesGraph.addEdge("Tokyo", "Osaka");
flightRoutesGraph.addEdge("Tokyo", "Kyoto");
flightRoutesGraph.addEdge("Tokyo", "Fukuoka");

export const races = flightRoutesGraph.getVertex("Tokyo"); // Beijing, Osaka, Kyoto, Fukuoka

//Метод getVertex() возвращает вершину с заданным значением (value). С помощью него мы убеждаемся, что граф построен корректно.

//Обход графа в глубину
//В реальных системах поиска авиабилетов учитываются разные атрибуты
//— даты, время прилета и отлета, класс обслуживания, наличие багажа и другие.

//Чтобы не усложнять учебный материал, мы решим более простую задачу — построим маршрут.
// Например, наша программа сможет ответить на вопрос: «Как добраться из Никосии в Осаку?»
//При этом мы будем учитывать не только прямые варианты перелета, но и маршруты с одной, двумя и даже тремя пересадками.

//Перед реализацией порассуждаем, как должен работать наш алгоритм. Возьмем для примера перелет из Никосии в Осаку:

//1 начинаем обход в глубину с вершины из которой строем маршрут - Никосия
//2 Выясняем что из никосии можно улететь в дубай и в рим
//3 Выбираем первое ребро дубай
//4 выясняем что из дубая можно улететь в осаку пекин рим
//5 выбираем осаку так как есть прямой перелет от туда - маршрут построен

// усложним задачу и надем все маршруты
//1 возвращаемся к дубаю рассматриваем пекин - из него можно улететь в осаку и токио - 1 маршрут еще найдет
//2 смотрим токио - есть осака - плюс еще
//3 итд

// Можно заметить, что простая реализация поиска войдет в бесконечный цикл. Города связаны взаимным авиасообщением.
// Если мы можем улететь из Никосии в Оаску, значит, мы можем улететь и обратно. Никосия и Осака находятся в списках
// смежности друг у друга.Можно заметить, что простая реализация поиска войдет в бесконечный цикл. Города связаны взаимным
// авиасообщением.
// Чтобы алгоритм не зациклился, нужно по мере обхода графа сохранять вершины, которые мы посетили и отбрасывать их при переборе.
// Действия на каждом шаге алгоритма повторяются, поэтому код можно оформить в виде рекурсивной функции
