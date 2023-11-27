import requests

def check_proxy(proxy):
    proxies = {'http': f'http://{proxy}', 'https': f'http://{proxy}'}
    try:
        response = requests.get('http://www.google.com', proxies=proxies, timeout=5)
        return response.status_code == 200
    except requests.RequestException as e:
        print(f"Error checking proxy {proxy}: {str(e)}")
        return False

def main():
    try:
        with open('proxy.txt', 'r') as file:
            proxies = file.read().splitlines()
        
        live_proxies = [proxy for proxy in proxies if check_proxy(proxy)]

        with open('proxy_live.txt', 'w') as live_file:
            for live_proxy in live_proxies:
                live_file.write(f"{live_proxy}\n")

        print(f"Successfully checked {len(proxies)} proxies. {len(live_proxies)} are live and saved to 'proxy_live.txt'.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()
