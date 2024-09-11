local function handleNuiMessage(type, data)
    SendNUIMessage({
        type = type,
        table = data
    })
end

local function toggleUI(state)
    handleNuiMessage('toggleUi', { state = state })
end

exports('toggleUI', toggleUI)

local function toggleNumberOfTask(state)
    handleNuiMessage('toggleNumberOfTask', { state = state })
end

exports('toggleNumberOfTask', toggleNumberOfTask)

local function updateTaskAmount(taskAmount)
    handleNuiMessage('updateTaskAmount', { taskAmount = taskAmount })
end

exports('updateTaskAmount', updateTaskAmount)

local function updateStageAmount(index, currentStage)
    handleNuiMessage('updateStageAmount', { currentStage = currentStage, index = index })
end

exports('updateStageAmount', updateStageAmount)

local function setCompleteByIndex(index)
    handleNuiMessage('setCompleteByIndex', { index = index })
end

exports('setCompleteByIndex', setCompleteByIndex)

local function setTaskData(title, maximumTask, showNumberOfTask, taskList, currentAmountTask)
    handleNuiMessage('setTaskData', {
        title = title,
        maximumTask = maximumTask,
        showNumberOfTask = showNumberOfTask,
        taskList = taskList,
        currentAmountTask = currentAmountTask or 0
    })
end

exports('setTaskData', setTaskData)

local function resetCompletes()
    handleNuiMessage('resetCompletes')
end

exports('resetCompletes', resetCompletes)
