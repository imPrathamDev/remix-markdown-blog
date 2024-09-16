---
title: "Mastering React Hooks: useState and useEffect"
date: "2023-09-16"
slug: "mastering-react-hooks"
description: "Learn how to use React's useState and useEffect hooks to manage state and side effects in your functional components."
auther: "Jane Doe"
categories:
    - "React"
    - "JavaScript"
    - "Web Development"
thumbnail: "/public/react-hooks.png"
---

# Mastering React Hooks: useState and useEffect

React Hooks have revolutionized the way we write React components. They allow us to use state and other React features in functional components, making our code cleaner and more reusable. In this article, we'll focus on two of the most commonly used hooks: `useState` and `useEffect`.

## useState: Managing State in Functional Components

The `useState` hook allows you to add state to your functional components. Here's a simple example:

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

In this example, `useState(0)` initializes a state variable `count` with a value of 0 and provides a function `setCount` to update it.

## useEffect: Handling Side Effects

The `useEffect` hook lets you perform side effects in functional components. It's similar to lifecycle methods in class components. Here's an example:

```javascript
import React, { useState, useEffect } from 'react';

function DocumentTitleUpdater() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

In this example, `useEffect` updates the document title whenever the `count` state changes.

## Conclusion

React Hooks like `useState` and `useEffect` provide a powerful way to manage state and side effects in functional components. They lead to more concise and easier-to-understand code compared to class components. As you become more comfortable with these basic hooks, you can explore more advanced hooks like `useContext`, `useReducer`, and even create your own custom hooks.

Happy coding!
