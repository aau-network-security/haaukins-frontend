# The Toolbox

This is a toolbox, with a some common tools that you will need for some tasks inside the Haaukins platform. All tools to be used for the tasks are already installed on the virtual Linux machine. To use some of the tools, you will need to use a terminal window. Remember that all the tools described in this document can do a lot of things and therefore it will always be a good idea to spend some time searching the internet or looking at some documentation before using the various tools.
- [The Toolbox](#the-toolbox)
  - [Terminal](#terminal)
  - [Binwalk](#binwalk)
  - [Exiftool](#exiftool)
  - [John the ripper](#john-the-ripper)
  - [Hydra](#hydra)
  - [NMAP:](#nmap)
  - [Crunch](#crunch)
  - [Wireshark](#wireshark)
  - [Kali linux terminal commands](#kali-linux-terminal-commands)

## Terminal 
To access the tools, we need to open a terminal window. This can be done by clicking on the following icon:

To navigate between folders in the terminal window we can use the following commands:

```bash 
$ ls # Show which files we can see in the directory we are in.
$ cd # Used to move to another directory.
# ------------- EXAMPLE -------------------
$ cd Downloads # Go to Downloads
$ ls # Show files located in Downloads
$ cd # Go back to home directory
$ cd .. # Go up a directory in the directory hierarchy.
```

Try typing the above into your own terminal window.

## Binwalk 
Binwalk is a tool that can search a given file for embedded files. It can be useful in situations where you would like to find out if there are extra files with e.g. a picture.
Binwalk is a terminal program. That is that to use the tool you have to open the terminal, navigate to the folder in which the file you want to examine is located and then type `binwalk` followed by the name of the file you want to examine. E.g:

```bash
$ cd Downloads      # Go to downloads
$ ls                # Show the filenames of files in downloads.
$ binwalk image.jpg # Use binwalk to examine a file.

```
To read more about `binwalk''s many functionalities, you can google it.


## Exiftool
EXIF is a tool that can display the EXIF data embedded in images. To use the EXIF tool on an image, you can do the following in the terminal.

```bash
$ cd Downloads       # Go to downloads
$ ls                 # Show the filenames of files in downloads.
$ exiftool image.jpg # Use exiftool to examine a file
```

To read more about `exiftool` you can google it.

## John the ripper
John the ripper(`john`) is a very flexible tool that can break codes. The tool supports both the use of word lists but also brute-force attacks. Since it is a very flexible tool, it also means that you have to pay attention to converting the file that you want to use `john' to the right format. To use the tool, open the terminal and navigate to the folder in which the file you want to work is located. E.g.

```bash
$ cd Downloads  # Go to downloads
$ ls            # Show the filenames of files in the directory.
$ john filename # Use john to crack a code.
```

John must have the file for which you would like to break the code in a specific format. But you can read about that on google.


## Hydra
Hydra is a tool that is made to break passwords for servers such as ``FTP'' servers, which also live in your terminal window.
It is also a real multifunctional tool, which you can read more about how to use on google.

## NMAP: 
We'll move on to another cool tool called NMAP, which can be used to scan the network you're on or other services on the web. Below is an example of how to use nmap to scan your network and see which devices are online on the subnet we are scanning:

```bash
$ ifconfig              # Used to find your own IP.
$ nmap 192.162.3.14     # Scan a single host.
$ nmap 192.162.3.14/24  # Scan an entire subnet.
$ nmap -O 192.162.3.14  # Scan a single host with fingerprint.

```  
  
Since `nmap' has a lot of functionality, it is always a good idea to read up on the tool on the web or search on google.



## Crunch
Crunch is a tool that is used for creating wordlists for password crackers like John the ripper or Hydra. 
Some usefull options are the following: 
```bash
-t allows you to specify a pattern
@ will insert lower case characters
, will insert upper case characters
% will insert numbers
^ will insert symbols
```
How to use:
```bash
crunch 10 10 -t 221299%%%% -o cprbrute.txt
```

## Wireshark
Wireshark is a tool that can be used to listen in on the local network. Below will be presented a lot of commands that can be used in wireshark's search field to filter the internet traffic that has been collected:
  
    
**Filters**    
```
| Usage                      | Filter syntax                             |  
| -------------------------- | ----------------------------------------- |
| Filter by IP               | ip.addr == 10.10.150.1                    |
| Filter by destination IP   | ip.dest == 10.10.150.1                    |
| Filter by source IP        | ip.src == 10.10.150.1                     |
| Filter by port             | tcp.port == 25                            |
| Filter by destination port | tcp.dstport == 23                         |
| Filter by domain name      | http.host == “domain.hkn”                 |  
```
To create more advanced filters, you can use both **Logical operators** and **Filter operators**:

**Logical operators**
```
| Operator  | Description | Example                                          |
| --------- | ----------- | ------------------------------------------------ |
| and / &&  | Logical AND | All the conditions should match                  |
| or / `||` | Logical OR  | Either all or one of the conditions should match |
| xor / ^^  | Logical XOR | Only one of the two conditions should match      |
| not / !   | Logical NOT | Not equal to                                     |  
```  
**Filter operators**
```
| Operator | Description           | Example                               |
| -------- | --------------------- | ------------------------------------- |
| eq / ==  | Queal                 | ip.dest == 192.168.1.1                |
| ne /  != | Not equal             | ip.dest != 192.168.1.1                |
| gt / \>  | Greater than          | frame.len \> 10                       |
| lt / \<  | Less than             | frame.len \< 10                       |
| ge / \>= | Greater than or equal | frame.len \>= 10                      |
| le / \<= | Less than or equal    | frame.len \<= 10                      |
```

You can read more about wireshark on google.

## Kali linux terminal commands
Now, after reading the above, you may have become a little more familiar with your terminal. Below you will find a more exhaustive list of commands you can try in your terminal window.

**System navigation**
```
| Description                                   | Command                              |
| --------------------------------------------- | ------------------------------------ |
| Ssh to host                                   | ssh \<user\>@\<network_domain_name\> |
| Switching user                                | su \<username\>                      |
| List files and directories                    | ls                                   |
| List files and directories (including hidden) | ls -a                                |
| Changing directory                            | cd \<directory_name\>                |
| Filter by domain name                         | http.host == “domain.hkn”            |
| FTP to host                                   | ftp hostname                         |
| Download file from FTP host                   | get \<filename\>                     |
| Read text file from FTP host                  | more \<filename\>                    |
```
**Interacting with files**
```
| Description                               | Command                                            |
| ----------------------------------------- | -------------------------------------------------- |
| Creating new file                         | touch \<filename\>                                 |
| Creating new directory                    | mkdir \<directory name\>                           |
| Moving file/directory                     | mv \<file or directory name\> \<Destination path\> |
| Copying file/directory                    | cp \<file or directory name\> \<Destination path\> |
| Reading contents of file                  | cat \<filename\>                                   |
| Search for a specific text string in file | grep "string_to_search_for" \<filename\>           |
| Writing to a file                         | myCommand \> filetowriteto.txt                     |
```

**Permissions and complex commands**
```
| Description                   | Command                                  |
| ----------------------------- | ---------------------------------------- |
| Find a file in directory tree | find \<root_of_search\> -name "filename" |
| Reading network information   | ifconfig                                 |
| Chaining commands             | \<command 1\> | \<command 2\> | \<…\>    |
| Changing permissions of file  | chmod \<permissions\> filename.txt       |
| Reading contents of file      | cat \<filename\>                         |
| Executing files               | ./\<filename\>                           |
```

If you are hungry for more, google is your friend as always. 