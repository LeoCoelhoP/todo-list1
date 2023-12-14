import "./style.css";
import "./cardStyle.css";
import "./sidebar.css";
class ProjectFolder {
    constructor() {
        this.toDoProjects = localStorage.getItem("projects");
        this.cardStorage = [];
        this.cardStorage.push(localStorage.getItem("cards"));
    }

    createProject() {
        const finalProject = [];
        finalProject.push(this.toDoProjects);

        const projectName = prompt("What is the project name?");
        finalProject.push(projectName);
        localStorage.setItem("projects", finalProject)

    }
    getCards() {
        return this.cardStorage;
    }
    getProjects() {
        return this.toDoProjects;
    }
    
    createCardDialog() {
        const selectedMenu = document.querySelector("#selected")
        
        function prioritySetter(priorityNode, priorityLabel) {
            priorityNode.setAttribute("type", "radio");
            priorityNode.setAttribute("name", "priority");
            priorityNode.classList.add("radio");
            priorityLabel.appendChild(priorityNode);
        }


        const dialog = document.createElement("dialog");
        const form = document.createElement("form");
        form.setAttribute("method", "dialog");


        const cardTitleLabel = document.createElement("label");
        cardTitleLabel.textContent = "To Do Title:"
        const cardTitle = document.createElement("input");
        cardTitle.setAttribute("type", "text");
        cardTitleLabel.appendChild(cardTitle);


        const cardDescriptionLabel = document.createElement("label");
        cardDescriptionLabel.textContent = "To Do Description:"
        const cardDescription = document.createElement("input");
        cardDescription.setAttribute("type", "text");
        cardDescriptionLabel.appendChild(cardDescription);


        const cardDueDateDescriptionLabel = document.createElement("label");
        cardDueDateDescriptionLabel.textContent = "Due Date:"
        const cardDueDate = document.createElement("input");
        cardDueDate.setAttribute("type", "date");
        cardDueDateDescriptionLabel.appendChild(cardDueDate);

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
        button.classList.add("show");
        button.textContent = "Submit";

        
        form.append(cardTitleLabel, cardDescriptionLabel, cardDueDate, priorityDiv, button);
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
            this.createCard(cardTitle.value, cardDescription.value, cardDueDate.value, priority, selectedMenu.className, 0);
            
            const cardInformations = [cardTitle.value, cardDescription.value, cardDueDate.value, priority, selectedMenu.className, 0];

            const updatedCardStorage = folderManager.getCards();
            console.log(folderManager)
            updatedCardStorage.push(cardInformations);
            localStorage.setItem("cards", updatedCardStorage)
        });
        
    }

    createCard(title, description, duedate, priority, folder, id) {
        const cardFragment = document.createDocumentFragment();

        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");

        const cardTitle = document.createElement("h1");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = title;

        const cardDesc = document.createElement("p");
        cardDesc.classList.add("card-description");
        cardDesc.textContent = description;

        const cardDueDate = document.createElement("p");
        cardDueDate.classList.add("due-date");
        cardDueDate.textContent = duedate;

        cardInfo.append(cardTitle, cardDesc, cardDueDate)



        const cardOptions = document.createElement("div");
        cardOptions.classList.add("card-options");

        const checkButton = document.createElement("p");
        checkButton.setAttribute("title", "Mark as completed");
        checkButton.textContent = "✔";

        const lowPriorityButton = document.createElement("div");
        lowPriorityButton.classList.add("low-priority-button");
        lowPriorityButton.setAttribute("title", "Set low priority");

        const mediumPriorityButton = document.createElement("div");
        mediumPriorityButton.classList.add("medium-priority-button");
        mediumPriorityButton.setAttribute("title", "Set medium priority");

        const highPriorityButton = document.createElement("div");
        highPriorityButton.classList.add("high-priority-button");
        highPriorityButton.setAttribute("title", "Set high priority");

        cardOptions.append(checkButton, lowPriorityButton, mediumPriorityButton, highPriorityButton);

        const card = document.createElement("div");
        card.classList.add("todo-card");
        card.classList.add(priority);

        card.append(cardInfo, cardOptions);
        card.classList.add(folder);
        card.id = id;

        const finalCardList = [];
        finalCardList.push(this.toDoCards);


        finalCardList.push(card);

        const content = document.querySelector(".content");
        content.appendChild(card);

        return card;
    }
}

const folderManager = new ProjectFolder();

class DisplayManager {
    constructor() {
        this.toDoCard = localStorage.getItem("cards");
        this.toDoProjects = folderManager.getProjects();

        try {
            if (this.toDoProjects !== "null") {

                const projectList = this.toDoProjects.split(",");

                projectList.forEach((project) => {
                    if (project.length > 1) {
                        const projectListNode = document.querySelector(".project-list");
                        const referenceNode = document.querySelector(".add-project");
                        const projectListItem = document.createElement("li");
                        projectListItem.textContent = project;
                        projectListItem.classList.add(project);

                        projectListNode.insertBefore(projectListItem, referenceNode);                    
                    }

                    
                });

            }            
        } catch (error) {

        }


        this.addSideBarClickEvent(); 
    }

    clearSelection(childNodes) {
        childNodes.forEach((child) => {
            if (child.id === "list-one" || child.id === "list-two") {
                const grandSonNode = child.childNodes;

                grandSonNode.forEach((listItem) => {
                    listItem.id = "";
                });
                
            } else {
                child.id = ""; 
            }
        });

    }

    addSideBarClickEvent() {
        const sidebarItems = document.querySelector(".sidebar-section");
        const childNodes = sidebarItems.childNodes;

        childNodes.forEach((child) => {
            if (child.id === "list-one" || child.id === "list-two") {
                const grandSonNode = child.childNodes;

                grandSonNode.forEach((listItem) => {
                    listItem.addEventListener("click", () => {
                        this.clearSelection(childNodes);

                        listItem.id = "selected";
                        this.clickHandler();
                    });
                });
                
            } else {
                child.addEventListener("click", () => {
                    this.clearSelection(childNodes);

                    child.id = "selected";
                    this.clickHandler();
                });
            }

        });

    }
    clickHandler() {
        const createCardButton = document.querySelector(".create-card-button");
        createCardButton.classList.remove("show");

        const menuSelected = document.querySelector("#selected"); 
        const menuSelectedClass = menuSelected.classList.value;


        const cardToBeShown = [];
        if (menuSelectedClass === "home") {
            cardToBeShown.push(localStorage.getItem("cards"));
            
            cardToBeShown.forEach((card) => {
                if (typeof card === "Array") {
                    console.log("leo")
                } else {
                    const cardData = card.split(",");
                    cardData.shift();
                    console.log(cardData.length)
                    for(let i = 0; i < cardData.length; i += 6) {
                        console.log(i)
                        const cardTitle = cardData[0 + i];
                        const cardDesc = cardData[1 + i];
                        const cardDueDate = cardData[2 + i];
                        const cardPriority = cardData[3 + i];
                        const cardFolder = cardData[4 + i];
                        const cardId = cardData[5 + i]
                        const cardNode =  folderManager.createCard(cardTitle, cardDesc, cardDueDate, cardPriority, cardFolder, cardId)
                        cardNode.classList.add("show");

                    }

                }
            });


        } else if (menuSelectedClass === "today") {
            // Get only duedate today todo cards 
        } else if (menuSelectedClass === "week") {
        } else if (menuSelectedClass === "add-project") {
            const addProject = document.querySelector(".add-project");
            addProject.addEventListener(("click"), () => {
                folderManager.createProject();
            });

        } else if (menuSelectedClass === "projects") {
            // Show propjects
        } else {
            createCardButton.classList.add("show");
            createCardButton.addEventListener("click", () => {
                folderManager.createCardDialog();
            });
        }
    }
}

const display = new DisplayManager();
