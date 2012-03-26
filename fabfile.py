from __future__ import with_statement
from fabric.api import env, local, settings, abort, run, cd
from fabric.contrib.console import confirm

env.user = 'samstarling'
env.hosts = ['samstarling.webfactional.com']

def firstrun():
    with cd("/home/samstarling/webapps/snoreditch"):
        run("git clone git@github.com:samstarling/snoreditch.git .")

def deploy():
    with cd("/home/samstarling/webapps/snoreditch"):
        run("git pull")
        run("pip install -r REQUIREMENTS")
