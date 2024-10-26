class Book{

    constructor(title, author, year, isAvailable)
    {
        this.title = title;
        this.author = author;
        this.year = year;
        this.isAvailable = isAvailable;
    }

    //Eğer isAvailable true ise, kitabı ödünç alın ve isAvailable'i false yapın, yoksa bir uyarı mesajı gösterin.
    borrow()
    {
        if(this.isAvailable)
        {
            this.isAvailable = false;
            console.log(`${this.title} kitabı ödünç alındı.`);
        }
        else
        {
            console.log("Bu kitap mevcut değil!");
        }
    }

    //returnBook(): Kitabı iade edin ve isAvailable'i true yapın.
    returnBook()
    {
        if(!this.isAvailable)
        {
            this.isAvailable = true;
            console.log(`${this.title} kitabı başarılı bir şekilde iade edildi.`);
        }
        else
        {
            console.log(`${this.title} kitabı zaten mevcut!`);
        }
    }

    //getInfo(): Kitap bilgilerini (başlık, yazar, yayın yılı ve mevcut durumu) bir konsol çıktısı olarak yazdırın.
    getInfo()
    {
        console.log("Kitap: " + this.title);
        console.log("Yazar: " + this.author);
        console.log("Yayın Yılı: " + this.year);
        if(this.isAvailable)
        {
            console.log("Mevcut Durumu: Stokta");
        }
        else
        {
            console.log("Mevcut Durumu: Ödünç Alınmış");
            
        }
    }

}

class Member
{
    constructor(name, membershipNumber)
    {
        this.name = name;
        this.membershipNumber = membershipNumber;
        this.borrowedBooks = [];
    }

    //borrowBook(book): Kitabı ödünç almak için Book nesnesinin borrow metodunu çağırır ve eğer başarılı olursa borrowedBooks dizisine ekler.
    borrowBook(book)
    {
        if(book.isAvailable)
        {
            book.borrow();
            this.borrowedBooks.push(book);
            console.log(`${book.title} kitabı ${this.name} tarafından başarılı bir şekilde ödünç alındı.`);
        }
        else
        {
            console.log(`${book.title} kitabı mevcut olmadığı için ödünç alınamadı.`);
        }
    }

    //returnBook(book): Kitabı iade etmek için Book nesnesinin returnBook metodunu çağırır ve borrowedBooks dizisinden çıkarır.
    returnBook(book)
    {
        const bookIndex = this.borrowedBooks.indexOf(book);
        if(bookIndex !== -1)
        {
            book.returnBook();
            this.borrowedBooks.splice(bookIndex, 1);
            console.log(`${book.title} kitabı ${this.name} tarafından başarılı bir şekilde iade edildi.`);
        }
        else
        {
            console.log(`${book.title} kitabı ${this.name} üyesi tarafından ödünç alınmadı.`);
        }
    }

    //listBorrowedBooks(): Üyenin ödünç aldığı tüm kitapların başlıklarını listeleyen bir konsol çıktısı üretir.
    listBorrowedBooks()
    {
        console.log(`${this.name} adlı üyenin ödünç aldığı kitaplar:`);
        this.borrowedBooks.forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} - ${book.author}`);
        });
    }
}

class Librarian
{
    constructor(name, employeeId)
    {
        this.name = name;
        this.employeeId = employeeId;
        this.assignedBooks = [];
    }

    //assignBook(member, book): Bir üyenin kitap ödünç almasına yardım etmek için member.borrowBook(book) metodunu çağırır ve kitabı assignedBooks dizisine ekler.
    assignBook(member, book)
    {
        member.borrowBook(book);
        this.assignedBooks.push({book: book, member:member});
        console.log(`${book.title} kitabı ${member.name} üyesine ${this.name} tarafından ödünç verildi.`);
    }

    //receiveReturnedBook(member, book): Üyenin kitabı iade etmesine yardım etmek için member.returnBook(book) metodunu çağırır ve kitabı assignedBooks dizisinden çıkarır.
    receiveReturnedBook(member, book)
    {
        const assignedIndex = this.assignedBooks.findIndex(
            assigned => assigned.book === book && assigned.member === member
        );

        if (assignedIndex === -1) {
            console.log(`${book.title} kitabı ${member.name} tarafından ödünç alınmamış.`);
            return;
        }


        member.returnBook(book);
        this.assignedBooks.splice(assignedIndex, 1);
        console.log(`${book.title} kitabı ${member.name} tarafından ${this.name} görevlisine iade edildi.`);
    }

    listAssignedBooks() {
        console.log("Ödünç Verilen Kitaplar:");
        this.assignedBooks.forEach((record, index) => {
            console.log(
                `${index + 1}. Kitap: ${record.book.title}, Üye: ${record.member.name}`
            );
        });
    }
}

let bookOne = new Book("Sherlock Holmes", "Furkan Turan", "2011", true);

bookOne.borrow();
bookOne.getInfo();
bookOne.returnBook();
bookOne.getInfo();

let bookTwo = new Book("Kürk Mantolu Madonna", "Sabahattin Ali", "1943", true);

bookTwo.borrow();
bookTwo.getInfo();
bookTwo.returnBook();
bookTwo.getInfo();

let memberOne = new Member("Ahmet Aslan", 157030);
memberOne.borrowBook(bookTwo);
memberOne.borrowBook(bookOne);
memberOne.listBorrowedBooks();

let librarionOne = new Librarian("Merve Tezcan", "127823");
librarionOne.assignBook(memberOne, bookTwo);

librarionOne.listAssignedBooks();
librarionOne.receiveReturnedBook(memberOne, bookTwo);