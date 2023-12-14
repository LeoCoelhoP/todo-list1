import { cardsManager } from "./cardsManager.js";
import { projectsFolderManager } from "./projectFolderManager.js";

export const dialogManager = ({
    projectsList: [],

    addProjectsClick() {
        const addProject = document.querySelector("#add-project");
        addProject.addEventListener(("click"), () => {
                dialogManager.createProjectDialog();
            });
    
    },

    createProjectDialog(newProject) {
        const dialog = document.createElement("dialog");
        const form = document.createElement("form");
        form.setAttribute("method", "dialog");

        const projectTitleLabel = document.createElement("label");
        projectTitleLabel.textContent = "Project Title:"

        const projectTitle = document.createElement("input");
        projectTitle.setAttribute("type", newProject);

        projectTitleLabel.appendChild(projectTitle);

        const button = document.createElement("button");
        button.textContent = "Submit";
        button.addEventListener("click", () => {
            projectsFolderManager.addProjectToSidebar(projectTitle.value);
        });
        
        form.appendChild(projectTitleLabel);
        form.appendChild(button);
        dialog.appendChild(form);

        const body = document.querySelector("body");

        body.appendChild(dialog);
        dialog.showModal();

    },

    createTodoDialog(project) {
        function prioritySetter(priorityNode, priorityLabel) {
            priorityNode.setAttribute("type", "radio");
            priorityNode.setAttribute("name", "priority");
            priorityNode.classList.add("radio");
            priorityLabel.appendChild(priorityNode);
        }


        const dialog = document.createElement("dialog");
        const form = document.createElement("form");
        form.setAttribute("method", "dialog");


        const todoTitleLabel = document.createElement("label");
        todoTitleLabel.textContent = "To Do Title:"
        const todoTitle = document.createElement("input");
        todoTitle.setAttribute("type", "text");
        todoTitleLabel.appendChild(todoTitle);


        const toDoDescriptionLabel = document.createElement("label");
        toDoDescriptionLabel.textContent = "To Do Description:"
        const toDoDescription = document.createElement("input");
        toDoDescription.setAttribute("type", "text");
        toDoDescriptionLabel.appendChild(toDoDescription);


        const todoDueDateDescriptionLabel = document.createElement("label");
        todoDueDateDescriptionLabel.textContent = "Due Date:"
        const todoDueDate = document.createElement("input");
        todoDueDate.setAttribute("type", "date");
        todoDueDateDescriptionLabel.appendChild(todoDueDate);

        const priorityDiv = document.createElement("div");

        const highPriorityLabel = document.createElement("label")
        const mediumPriorityLabel = document.createElement("label")
        const lowPriorityLabel = document.createElement("label")

        const highPriority = document.createElement("input");
        highPriority.setAttribute("value", "high");
        prioritySetter(highPriority, highPriorityLabel);


        const mediumPriority = document.createElement("input");
        mediumPriority.setAttribute("value", "medium");
        prioritySetter(mediumPriority, mediumPriorityLabel);

        const lowPriority = document.createElement("input");
        lowPriority.setAttribute("value", "low");
        prioritySetter(lowPriority, lowPriorityLabel);

        const button = document.createElement("button");
        button.textContent = "Submit";

        
        form.append(todoTitleLabel, toDoDescriptionLabel, todoDueDate, priorityDiv, button);
        dialog.appendChild(form);

        const body = document.querySelector("body");

        body.appendChild(dialog);

        priorityDiv.append(highPriorityLabel, mediumPriorityLabel, lowPriorityLabel);

        let allCheckBox = document.querySelectorAll('.radio')
        let priority;
        allCheckBox.forEach((checkbox) => { 
            checkbox.addEventListener('change', (event) => {
                if (event.target.checked) priority = event.target.value;
            });
        });
        dialog.showModal();
        button.addEventListener("click", () => {
            

            const title = todoTitle.value.toString();
            
            cardsManager.createCard(title, "description", "dueDate", "priority", "project", 0);
            
        });

    }
});