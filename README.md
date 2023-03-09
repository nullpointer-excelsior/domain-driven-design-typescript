# Modelando el dominio con técnicas de Domain Driven Design

Domian Driven Design nos da una serie de patrones y guia de diseños para modelar el dominio de nuestra aplicacion acercandonos al punto de vista de expertos. 
si bien DDD es recomendado para sistemas complejos, utilizar los patrones de diseño y estrategías en nuestras aplicaciones 
nos dará la posibilidad de crear código mantenible testeable y que se aleja del tan llamado modelo anemico.

A continuacíon les presentaré componentes de software reutilizables con los cual podras aprender conceptos de DDD, si bien esta no es una guía de Domain Driven Design, utilizar 
uno que otro patrón de diseño nos ayudará a mejorar como ingenieros de software.

## SeedWork concepto de microlibrería

Seedwork es un termino acuñado por los tan famosos y faranduleros padres del software no recuerdo el nombre pero lo importante es el concepto. SeedWork se refiere a un conjunto de componentes
reutilizables que serán la base de nuestro dominio. Estos contendrán estructuras bases reutilizables y nos darán la guía como debemos modlear los componentes del dominio, también tendrán las dependencias base de librerás de terceros. si utilizamos librerías de terceros como validaciones, operaciones con fechas y tiempo, etc. debemos tener en cuenta de crear los componentes lo mas desacoplados posibles de estas librerías, para lograrlo podemos hacer uso de patrones de diseño u otras técnicas sencillas de POO.

## Componentes básicos de DDD

Los componentes básicos en DDD son los siguientes en forma de árbol

* Entities
    * Value Objects
    * Identifiers
* AggregateRoot
* Domain Events
* Repositories
* Domain services
* DTO
* Factories
* Use Cases
* Application Services
* Bounded Context

Si bien estos son los componentes base que encontraremos en DDD nos centraremos en Nuestra entidades y sus operaciones mas otros casos que podmeos encontrarnos cuando desarrollamos las lógicas de negocio

### Identificadores

Nuestrtas entidades deben tener identidad es decir ser unicos, par alograrlo crearemos nuestro componente `ID` el cual representará la identidad de nuestra entidad
