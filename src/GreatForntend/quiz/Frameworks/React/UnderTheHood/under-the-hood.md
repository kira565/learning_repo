# Under the hood:

What we expect from interfaces ?

1. Helps us to save problems
2. No lags, all smoothie

## Why some interfaces are lagging ?

A low number of FPS, then expected (we need minimum 60)

## How Interface renders ?

There are 2 phases:

1. Rendering and Reconciliation (Рендеринг и сравнение)

**Note: VirtualDOM это очень старое понятие которое вводит в заблуждение, даже дом по хорошему есть не везде. Поэтому нужно отойти от него.**

All begins from React Elements: creating element tree. But this is not a single tree here. (Дерево элементов не единственное дерево)

When app started we run our code, all JSX from components is changing to React.CreateElement() and ELEMENT TREE is created here.
