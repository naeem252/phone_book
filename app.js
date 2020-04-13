//Local Storage Controller

const LocalCtrl = (function () {

    const getItems = function () {
        let items;
        if (localStorage.getItem('items') === null) {
            items = [];
        } else {
            items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
    };

    return {
        allLocalStorage: function (name, number) {

            const items = getItems();

            let ID;
            //check if data items in empty
            if (items[items.length - 1] === undefined) {
                ID = 0;
            } else {
                ID = items[items.length - 1].id + 1;
            }
            const item = {
                id: ID,
                name: name,
                number: number,
                favorite: false
            };

            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));

        },
        getAllItems: function () {

            return getItems();
        },
        updateFavoriteState: function (id) {
            const items = getItems();
            items.forEach(item => {
                if (item.id === id) {
                    item.favorite = !item.favorite;
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        updateItem:function(name,number,id){
            const items=getItems();
            items.forEach(item=>{
                if(item.id===id){
                    item.name=name;
                    item.number=number;

                }
            });
            localStorage.setItem('items',JSON.stringify(items));
        },
        deleteItem: function (li) {
            const id = parseInt(li.getAttribute('data-id'));
            const items = getItems();
            items.forEach((item, index) => {
                if (item.id === id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        }

    }//return carly
})();

//item controller

const ItemCtrl = (function () {

    const data = {
        items: [],
        currentItem: null,
    };

    return {
        //init items
        initialSetDataItems: function (items) {
            items.forEach(item => {
                data.items.push(item);
            });
        },
        //add item to the data items
        addItemToDataItem: function (name, number) {
            let ID;
            //check if data items in empty
            if (data.items[data.items.length - 1] === undefined) {
                ID = 0;
            } else {
                ID = data.items[data.items.length - 1].id + 1;
            }

            const newItem = {
                id: ID,
                name: name,
                number: number,
                favorite: false
            };
            data.items.push(newItem);
        },
        //change favorite status
        updateFavoriteState: function (id) {

            data.items.forEach(item => {
                if (item.id === id) {

                    item.favorite = !item.favorite;
                }
            });


        },
        //update current item
        updateCurrent: function (li) {
            data.currentItem = parseInt(li.getAttribute('data-id'));
        },
        //update items data vlue
        updateItem:function(name,number,id){
            data.items.forEach(item=>{
               if(item.id===id){
                   item.name=name;
                   item.number=number;
               }
            });
        },
        //delete data items
        deleteItem: function (li) {
            const id = parseInt(li.getAttribute('data-id'));
            data.items.forEach((item, index) => {
                if (item.id === id) {
                    data.items.splice(index, 1);
                }
            });
        },
        //send initial data
        data: function () {
            return data;
        }
    }//return item

})();

const UICtrl = (function () {

    const allSelectorsIds = {
        name: '#name',
        number: '#number',
        allList: '#all-list',
        edit: '#edit',
        delete: '#delete',
        favorite: '#favorite',
        addItem: '#add-item',
        listHeading: '#list-heading',
        editItem: "#edit-item",
        message:'#message'
    };

    const message=function (msg,cls) {
            const message=document.querySelector(allSelectorsIds.message);
            message.textContent=msg;
            message.className=cls;
            message.style.top='0';

            setTimeout(function () {
                message.style.top='-30%';
            },3000);
    };

    const allList = document.querySelector(allSelectorsIds.allList);


    return {
        createItemList: function (items) {
            //dsiplay list heading
            if (items.length > 0) {
                document.querySelector(allSelectorsIds.listHeading).style.display = "block";
            }

            let ul = "<ul class='list-group'>";
            items.forEach(item => {
                ul += `
               <li data-id="${item.id}" class="${item.favorite ? 'c-active' : ''} list-group-item text-capitalize d-flex justify-content-between align-items-center">
                    <span class="name">${item.name}<a href="#" id="favorite">
                            <i class="fas fa-star-of-life"></i>
                        </a>
                    </span>
                    <span class="number">${item.number}</span>
                        <span class="list-right">
                        <a href="#" id="edit">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                        <a href="#" id="delete">
                            <i class="fas fa-trash-alt"></i>
                        </a>

                    </span>
                    </li>
               `;
            });

            ul += "</ul>";
            allList.innerHTML = ul;
        },
        //add single item to the ul list
        addSingleItemToTheList: function (name, number, id) {
            //display list heading
            document.querySelector(allSelectorsIds.listHeading).style.display = "block";

            //crate li element
            const li = document.createElement('li');
            li.setAttribute('data-id', id);
            li.className = ` list-group-item text-capitalize d-flex justify-content-between align-items-center`;
            li.innerHTML = `
          <span class="name">${name}<a href="#" id="favorite">
                            <i class="fas fa-star-of-life"></i>
                        </a>
                    </span>
                    <span class="number">${number}</span>
                        <span class="list-right">
                        <a href="#" id="edit">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                        <a href="#" id="delete">
                            <i class="fas fa-trash-alt"></i>
                        </a>

                    </span>
          `;
            allList.querySelector('ul').appendChild(li);
            message(`you added ${name} to the list`,'added');
        },
        //add favorite class to the item
        changeFavoriteClass: function (li) {

            if (li.classList.contains('c-active')) {
                li.classList.remove('c-active');
            } else {
                li.classList.add('c-active');
            }
        },
        activeUpdateState: function (name, number) {
            //hide add btn
            document.querySelector(allSelectorsIds.addItem).style.display = 'none';
            document.querySelector(allSelectorsIds.addItem).disabled = true;
            //show update bnt
            document.querySelector(allSelectorsIds.editItem).style.display = "block";
            document.querySelector(allSelectorsIds.addItem).disabled = false;

            document.querySelector(allSelectorsIds.name).value = name;
            document.querySelector(allSelectorsIds.number).value = number;
            document.querySelector(allSelectorsIds.name).focus();
        },
        updateItem: function (name, number, id) {
            //hide add btn
            document.querySelector(allSelectorsIds.addItem).style.display = 'block';
            document.querySelector(allSelectorsIds.addItem).disabled = true;
            //show update bnt
            document.querySelector(allSelectorsIds.editItem).style.display = "none";
            document.querySelector(allSelectorsIds.addItem).disabled = false;


            const allItems = document.querySelector(allSelectorsIds.allList + ' ul').children;
            Array.from(allItems).forEach(item => {
                if (parseInt(item.getAttribute('data-id')) === id) {
                    item.querySelector('.name').childNodes[0].textContent = name;
                    item.querySelector('.number').textContent = number;
                }
            });
        },
        deleteItem: function (li) {
            if (li.parentElement.children.length === 1) {
                //hide list heading
                document.querySelector(allSelectorsIds.listHeading).style.display = "none";
            }
            li.remove();
        },
        //return all selector to the app controller
        allSelectorsIds: function () {
            return allSelectorsIds;
        }
    }

})();


const App = (function () {

    const allSelectorsIds = UICtrl.allSelectorsIds();

    //create initial item list
    const createItemList = function () {
        const items = LocalCtrl.getAllItems();
        //initial set to data items
        ItemCtrl.initialSetDataItems(items);
        UICtrl.createItemList(items);
    };

    const loadEvents = function () {
        const addBtn = document.querySelector(allSelectorsIds.addItem);
        const allList = document.querySelector(allSelectorsIds.allList);
        const updateBtn = document.querySelector(allSelectorsIds.editItem);

        //    add button event
        addBtn.addEventListener('click', addItem);

        //    when click all list div
        allList.addEventListener('click', allListClicked);

        // update event
        updateBtn.addEventListener('click', updateItem);

    };

    // add item when click add button
    const addItem = function (e) {
        e.preventDefault();


        const name = document.querySelector(allSelectorsIds.name);
        const number = document.querySelector(allSelectorsIds.number);
        if (name.value === '' || number.value === '') {
            alert('input fields not be empty');
        } else {
            //add new item to the data items
            ItemCtrl.addItemToDataItem(name.value, parseInt(number.value));
            //add to the localstorage
            LocalCtrl.allLocalStorage(name.value, parseInt(number.value));

            // add new item to the ui list
            let id;
            if (ItemCtrl.data().items.length <= 0) {
                id = 0
            } else {
                id = ItemCtrl.data().items[ItemCtrl.data().items.length - 1].id;
            }

            UICtrl.addSingleItemToTheList(name.value, number.value, id);


            //clean input
            name.value = '';
            number.value = '';
            //focus input
            name.focus();


        }


    };

    //update item
    const updateItem = function (e) {
        e.preventDefault();
        const name = document.querySelector(allSelectorsIds.name);
        const number = document.querySelector(allSelectorsIds.number);
        //  update localhost item
        LocalCtrl.updateItem(name.value, parseInt(number.value), ItemCtrl.data().currentItem);
        // update item
        ItemCtrl.updateItem(name.value, parseInt(number.value), ItemCtrl.data().currentItem);
        //    update Ui item
        UICtrl.updateItem(name.value, parseInt(number.value), ItemCtrl.data().currentItem);


        //clean input
        name.value = '';
        number.value = '';
        //focus input
        name.focus();


    };
    //when all list clicked
    const allListClicked = function (e) {

        //if target trigger the edit icon
        if (e.target.classList.contains('fa-star-of-life')) {
            const li = e.target.parentElement.parentElement.parentElement;
            //    update current element favorite state
            const id = li.getAttribute('data-id');
            //update favorite it item controller
            ItemCtrl.updateFavoriteState(parseInt(id));
            //update favorite it LocalStorage controller
            LocalCtrl.updateFavoriteState(parseInt(id));
            //change class to the favorite item
            UICtrl.changeFavoriteClass(li);

        }


        //edit

        if (e.target.classList.contains('fa-pencil-alt')) {
            const li = e.target.parentElement.parentElement.parentElement;
            const name = li.querySelector('.name').innerText;
            const number = li.querySelector('.number').innerText;
            //update current item
            ItemCtrl.updateCurrent(li);
            UICtrl.activeUpdateState(name, number);
        }

        //delete item
        if (e.target.classList.contains('fa-trash-alt')) {
            //    confirm deleting
            if (confirm('are you sure ! you want to delete it?')) {
                const li = e.target.parentElement.parentElement.parentElement;
                //    delete form ui
                UICtrl.deleteItem(li);
                //    delete form items
                ItemCtrl.deleteItem(li);
                //delete form local storage
                LocalCtrl.deleteItem(li);

            }
        }


        e.preventDefault();

    };

    return {
        init: function () {
            loadEvents();
            createItemList();

        }
    }
})(ItemCtrl, UICtrl, LocalCtrl);

document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
    }
});

App.init();