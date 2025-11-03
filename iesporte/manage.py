#!/usr/bin/env python
import os
import sys

def main():
    """Executa o utilitário de linha de comando do Django."""
    # Ajuste aqui o caminho correto para o seu settings.py
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iesporte.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Não foi possível importar Django. Certifique-se de que ele está instalado "
            "e disponível no seu ambiente virtual."
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
