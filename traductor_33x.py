import os
import sys
import requests
import json
import time

# Configurar salida para soportar caracteres especiales en Windows
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# --- CONFIGURACIÓN TÁCTICA ---
API_KEY = "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"
BASE_URL = "https://integrate.api.nvidia.com/v1"
MODEL_ID = "nvidia/llama-3.3-nemotron-super-49b-v1"

# Colores ANSI
RED = "\033[1;31m"
GREEN = "\033[1;32m"
YELLOW = "\033[1;33m"
CYAN = "\033[1;36m"
RESET = "\033[0m"
BOLD = "\033[1m"
MAGENTA = "\033[1;35m"

def print_banner():
    os.system('cls' if os.name == 'nt' else 'clear')
    banner = f"""
{RED}╔═════════════════════════════════════════════════════════════════════╗
║ {YELLOW}SAN LUIS PRO {RESET} - {MAGENTA}TERMINAL DE TRADUCCIÓN ELITE {RED}                      ║
║ {CYAN}Motor: Llama 3.3 Nemotron Super {RED}                                   ║
╚═════════════════════════════════════════════════════════════════════╝{RESET}
{YELLOW}Escribe tu texto para traducir. Escribe '{RED}salir{YELLOW}' o '{RED}exit{YELLOW}' para cerrar.{RESET}
    """
    print(banner)

def translate(text):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": MODEL_ID,
        "messages": [
            {
                "role": "system",
                "content": "Eres un traductor profesional de élite. Traduce el siguiente texto al inglés (United States English). Mantén el tono original. Solo entrega la traducción."
            },
            {
                "role": "user",
                "content": text
            }
        ],
        "temperature": 0.1
    }

    try:
        response = requests.post(f"{BASE_URL}/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        return result['choices'][0]['message']['content'].strip()
    except Exception as e:
        return f"Error: {e}"

def main():
    print_banner()
    
    while True:
        try:
            print(f"\n{BOLD}{CYAN}➤ ORIGEN:{RESET}", end=" ")
            user_input = input().strip()
            
            if user_input.lower() in ['salir', 'exit', 'quit', 's']:
                print(f"\n{RED}[SISTEMA]{RESET} Cerrando Estación de Traducción. Cambio y fuera.")
                time.sleep(1)
                break
                
            if not user_input:
                continue
                
            print(f"{YELLOW}[PENSANDO]{RESET}...", end="\r")
            
            translation = translate(user_input)
            
            # Limpiar el [PENSANDO]
            print(" " * 20, end="\r")
            
            print(f"{BOLD}{GREEN}✔ INGLÉS:{RESET} {BOLD}{translation}{RESET}")
            print(f"{RED}─────────────────────────────────────────────────────────────────────{RESET}")
            
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"{RED}Error: {e}{RESET}")

if __name__ == "__main__":
    main()
