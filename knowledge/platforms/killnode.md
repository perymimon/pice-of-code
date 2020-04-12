**Windows Machine:**
--------------------

Need to kill a Node.js server, and you don't have any other Node processes running, you can tell your machine to kill all processes named `node.exe`. That would look like this:

    taskkill /im node.exe

And if the processes still persist, you can force the processes to terminate by adding the `/f` flag:

    taskkill /f /im node.exe

If you need more fine-grained control and need to only kill a server that is running on a specific port, you can use `netstat` to find the process ID, then send a kill signal to it. So in your case, where the port is `8080`, you could run the following:

    C:\>netstat -ano | find "LISTENING" | find "8080"

The fifth column of the output is the process ID:

      TCP    0.0.0.0:8080           0.0.0.0:0              LISTENING       14828
      TCP    [::]:8080              [::]:0                 LISTENING       14828

You could then kill the process with `taskkill /pid 14828`. If the process refuses to exit, then just add the `/f` (force) parameter to the command.


----------

**Linux machine:**
------------------

The process is almost identical. You could either kill all Node processes running on the machine (use `-$SIGNAL` if `SIGKILL` is insufficient):

    killall node

Or also using `netstat`, you can find the PID of a process listening on a port:

    $ netstat -nlp | grep :8080
    tcp        0      0 0.0.0.0:8080         0.0.0.0:*                   LISTEN      1073/node

The process ID in this case is the number before the process name in the sixth column, which you could then pass to the `kill` command:

    $ kill 1073

If the process refuses to exit, then just use the `-9` flag, which is a `SIGTERM` and cannot be ignored:

    $ kill -9 1073