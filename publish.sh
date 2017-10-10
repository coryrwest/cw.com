#!/bin/bash

rsync -azhv -e "ssh" --progress /home/ubuntu/workspace/docs/ westropp@westroppstudios.com:~/public_html/corywestropp\.com/
