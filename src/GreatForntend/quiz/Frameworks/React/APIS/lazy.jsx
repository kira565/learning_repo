//* lazy lets us defer loading components code until its rendered for the first time

import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

//lazyy acctpts a function that return Promise or another thenble (promise like object)
//react will not call load until the first time we attempt to render the returned component.
// After react first call lazy it will wait for it to resolve, and then render the resolved value's
// defailt as React component. Both returned promuse and the promise resolved value will be cached , so
// React will not call load more than once. If the promise rejects, React will throw the rejection
// reason for nearest Error Boundary to handle
