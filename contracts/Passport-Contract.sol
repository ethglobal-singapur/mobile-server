// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Passport {
    struct Country {
        string name;
        string date;
        bool isVisit;
    }

    struct Person {
        string name;
        string document_number;
        string surname;
        string country;
        string birthdate;
        Country[] countries;
    }

    Person[] public persons;

    mapping(string => Person) public persons_map;

    function isPersonExist(
        string memory _document_number
    ) public view returns (bool) {
        return bytes(persons_map[_document_number].name).length > 0;
    }

    // Add person

    function addCountryToPerson(
        Country memory visited_country,
        string memory _document_number,
        string memory _name,
        string memory _surname,
        string memory _country,
        string memory _birthdate,
        string memory _date
    ) public {
        if (!isPersonExist(_document_number)) {
            this.addPerson(
                _document_number,
                _name,
                _surname,
                _country,
                _birthdate,
                _date,
                new Country[](0)
            );
        }

        // oldCountries
        Person storage person = persons_map[_document_number];

        person.countries.push(visited_country);
        for (uint i = 0; i < persons.length - 1; i++) {
            if (
                keccak256(abi.encodePacked(persons[i].document_number)) ==
                keccak256(abi.encodePacked(_document_number))
            ) {
                delete persons[i];
                delete persons_map[_document_number];
            }
        }
        persons_map[_document_number] = person;
        persons.push(person);
    }

    function getPerson(
        string memory _document_number
    ) public view returns (string memory) {
        return persons_map[_document_number].name;
    }

    function addPerson(
        string memory _document_number,
        string memory _name,
        string memory _surname,
        string memory _country,
        string memory _birthdate,
        string memory _date,
        Country[] memory _countries
    ) public {
        if (isPersonExist(_document_number)) {
            revert("Person already exist;400");
        }

        Person storage newPerson = persons_map[_document_number];
        newPerson.name = _name;
        newPerson.surname = _surname;
        newPerson.document_number = _document_number;
        newPerson.country = _country;
        newPerson.birthdate = _birthdate;
        if (_countries.length == 1) {
            newPerson.countries.push(
                Country(_countries[0].name, _date, _countries[0].isVisit)
            );
        }
        persons.push(newPerson);
    }

    function removeAllPeople() public {
        delete persons;
    }

    function getAllPeople() public view returns (Person[] memory) {
        return persons;
    }
}
