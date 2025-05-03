from django.apps import AppConfig
import requests
import socket

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Register with Consul
        service_host = 'host.docker.internal'   # container IP or service name (use docker DNS if not localhost)
        service_port = 5002         # the port your DRF service runs on
        consul_host = 'localhost'       # use 'localhost' if Consul runs on local, else 'consul' (docker service name)
        consul_port = 8500

        payload = {
            "ID": "application_service",
            "Name": "application_service",
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
