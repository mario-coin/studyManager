# Para rodar o app

1.      rodar ./docker-compose.yml

# Para rodar a box de integração com moodle

1.      rodar ./docker-compose.yml
2.      logar no moodle e entrar em "site  administration"
3.      pesquisar por "web service"
4.      habilitar "enablewebservices" e "enablemobilewebservice"
5.      pesquisar e ir em "Manage tokens"
6.      criar token vinculado ao user admin, mantendo as demais configurações
7.      copiar o token criado e usar onde é requerido pelo client
8.      escolher uma das opções para executar
    *      rebuildar o container do docker-compose
    *      > npm run moodle_box

## Links Úteis

```
Material Design:                https://material-ui.com/getting-started/templates/

Icons:                          https://material.io/resources/icons/?style=baseline

ORM:                            https://sequelize.org/v5/manual/getting-started.html

Moodle Client:                  https://github.com/mudrd8mz/node-moodle-client

Moodle Web Service Requests:    http://localhost/admin/webservice/documentation.php
```