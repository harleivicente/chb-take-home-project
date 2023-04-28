# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here


This function although implements simple logic was difficult to understand because of its cyclomatic complexity, meaning the number of possible routes through the code. For example, when a "null" was provided we already have enough information to return the desired result "0". However, one has to follow through with most of the code to reach that conclusion.

To improve readability, I separated the code into three distinct blocks (i) no input is provided, (ii) a partition key, and (iii) an event without a partition key. Each of these three cases can be separated logically making the code more linear, predictable, and easier to read.

(i) This is the simplest case as we'll simply return a constant

(ii) The logic to manipulate a partition was placed in an independent pure function that is unaware of the remaining cases (allows for unit testing of this function specifically).

(iii) The last case can also be handled independently by simply running the string version of the input through a hash.

One aspect that improved the code was the removal of the variable `candidate` as it was used through the entire function and could be influenced by all three cases mentioned above. This means it is more likely for an error in one case to affect another.