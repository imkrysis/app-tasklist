document.addEventListener('deviceready', onDeviceReady, false)

taskItems = []

function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)

    const taskList = document.getElementById('taskList')
    const inputTask = document.getElementById('inputTask')
    const btnTask = document.getElementById('btnTask').onclick = addTask
    const btnRemoveList = document.getElementById('btnRemoveList').onclick = removeList

    getList()

}

function addTask() {

    if (inputTask.value != "") {

        if (checkItem(inputTask.value)) {

            processItem(inputTask.value)

            saveList()

        } else {

            alert("That task is already introduced")

        }

        inputTask.value = ""
        

    } else {

        alert("You must type something...")

    }    

}

function getList() {

    if (localStorage.getItem("taskList") != null) {

        JSON.parse(localStorage.getItem("taskList")).item.forEach(item => {

            processItem(item)
            
        });

    } else {

        alert('There isnt any task-list locally found')

    }

}

function saveList() {

    localStorage.setItem("taskList", JSON.stringify({"item":taskItems}))

}

function removeList() {

    localStorage.removeItem("taskList")

    taskItems = []

    taskList

}

function processItem(item) {

    taskItems.push(item)

    node = document.createElement('li')

    node.appendChild(document.createTextNode(item))

    taskList.appendChild(node)

}

function checkItem(item) {

    for (var i in taskItems) {

        if (taskItems[i] == item) {

            return false

        }

    }

    return true

}
