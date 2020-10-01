# my_caesar_cli

##### 1. Clone the repository
    git clone https://github.com/GoldenkovVitali/nodejs-course-template.git
##### 2. Install node_modules
    npm install
##### 3. Go to the task directory
    cd CLI-tool

### Usage
CLI tool accept 4 options (short alias and full name):
1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

##### It was created mock file `test.txt` with the next content: 'Hello' to simplify checks you can run next commands one by one to check everything:
``` 
$ node index -s 5 -i './test.txt' -o 'result.txt' -a encode
```
> output in the result.txt: `Czggj`
```
$ node index -s 5 -i './result.txt' -o 'test2.txt' -a decode
```
> output in the text2.txt: `Hello`
```
$ node index -s 5 -a encode
```
>type input in the console: `hello`
>output in the console: `czggj`
```
open new terminal+ cd CLI-tool

$ node index -s 5 -a decode
```
>type input in the console: `czggj`
>output in the console: `hello`
```
open new terminal+ cd CLI-tool

$ node index -s 6 -o test3.txt -a encode
```
>type input in the console: `hello`
>output in the test3.txt: `Byffi`
```
open new terminal + cd CLI-tool
$ node index -s 6 -i test3.txt -a decode
```
>output in the console: `hello`
```
$ node index -s 6 -i './test.txt' -o 'result.txt' -a ABCD
```
>output in the console: `Invalid parameter! Please, write encode/decode for action parameter Process exited with code 6`
```
$ node index -i test.txt
```
>output in the console: `Required! Please, write shift parameter Process exited with code 3`
```
$ node index -s 6 -i ABCD.txt -a encode
```
>output in the console: `Input file is not exist! D:\RS SCHOOL\node.js-2020-Q3\nodejs-course-template\task1\ABCD.txt. Process exited with code 7`