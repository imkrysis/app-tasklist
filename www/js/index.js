document.addEventListener('deviceready', onDeviceReady, false)

taskItems = []

function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)

    const taskList = $('#taskList')
    const inputTask = $('#inputTask')
    const btnTask = $('#btnTask').click(function(){addTask()})
    const btnRemoveList = $('#btnRemoveList').click(function(){removeList()})

    removeItems = []

    getList()

}

function getList() {

    if (localStorage.getItem('taskList') != null) {

        JSON.parse(localStorage.getItem('taskList')).item.forEach(item => {

            processItem(item)
            
        });

        updateList()

    } else {

        alert('There isnt any task-list locally found')

    }

}

function addTask() {

    if (inputTask.value != '') {

        if (checkItem(inputTask.value)) {

            processItem(inputTask.value)

            saveList()

            updateList()

        } else {

            alert('That task is already introduced')

        }

        inputTask.value = ''
        

    } else {

        alert('You must type something...')

    }    

}

function removeTask() {

    alert('Remove Task Clicked')
    
}

function saveList() {

    localStorage.setItem('taskList', JSON.stringify({'item':taskItems}))

}

function updateList() {

    $('.btnRemoveItem').click(function(){removeTask()})

    $('#taskList').listview().listview('refresh');

}

function removeList() {

    if (taskItems.length > 0) {

        localStorage.removeItem('taskList')

        taskItems = []
    
        $('#taskList').empty()
    
        alert('The list has been removed')

    } else {

        alert('The list doesnt have any item')

    }    

}

function processItem(item) {

    taskItems.push(item)

    $('#taskList').append('<li>' + item + '<button class="btnRemoveItem">X</button</li>')

}

function checkItem(item) {

    for (var i in taskItems) {

        if (taskItems[i] == item) {

            return false

        }

    }

    return true

}
