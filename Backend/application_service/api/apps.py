from django.apps import AppConfig
from decouple import config
import requests
import socket


def get_container_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't have to be reachable
        s.connect(('10.255.255.255', 1))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Register with Consul
        service_host = get_container_ip() #config('SERVICE_HOST', default='host.docker.internal') # container IP or service name (use docker DNS if not localhost)
        service_port = config('PORT', default=5002, cast=int) 
        consul_host = config('CONSUL_HOST', default='localhost') # use 'localhost' if Consul runs on local, else 'consul' (docker service name)
        consul_port = config('CONSUL_PORT', default=8500, cast=int)
        service_id = config('SERVICE_ID', default='application_service')
        service_name = config('SERVICE_NAME', default='application_service')

        payload = {
            "ID": service_id,
            "Name": service_name,
            "Address": service_host,
            "Port": service_port,
            "Check": {
                "HTTP": f"http://{service_host}:{service_port}/health/",
                "Interval": "10s"
            }
        }

        try:
            r = requests.put(
                f"http://{consul_host}:{consul_port}/v1/agent/service/register",
                json=payload
            )
            if r.status_code == 200:
                print("Service registered with Consul")
            else:
                print(f"Consul registration failed: {r.status_code} {r.text}")
        except Exception as e:
            print(f"Consul registration exception: {e}")
