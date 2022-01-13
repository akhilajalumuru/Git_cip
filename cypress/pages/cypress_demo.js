let task =['Wireframes','Mike Trout','in progress','Jane Doe'];
export class Runner{
    
    navigate(url){
        cy.visit(url)//opening browser
        cy.get('.at-cm-no-button').click()//closing dialogue box
    }
    open_ipforms(){
        cy.get(':nth-child(1) > :nth-child(1) > .dropdown-toggle').click()
    }
    simpleForms_message(msg){
        cy.get('.open > .dropdown-menu > :nth-child(1) > a').click()
        cy.get('.form-group > #user-message').type(msg)
       
        cy.get('#get-input > .btn').click() // click show_message button
        // cy.get(':nth-child(4) > .panel-body > :nth-child(4)').should('contain','Your Message: Hello world')
        
    
   
    }
    simpleForms_total(a,b){

        cy.get('#sum1').type(a)  // enter a value
        cy.get('#sum2').type(b)  // enter b value
        cy.get('#gettotal > .btn').click() // click get_total
        cy.wait(2000)
        // cy.get('[style="height: 50px; width: 100%;"]').should('contain','Total a + b = 5')
        //akhik;alrevatiyele
        //sandeepjsgijck
    }
    checkBox(){
        cy.get('.open > .dropdown-menu > :nth-child(2) > a').click()  // select checkbox demo
        cy.get('#isAgeSelected')
        .check()
       
        cy.get('#txtAge').should('contain','Success - Check box is checked')
        cy.get('#check1').click() // click checkall button
        cy.get(':nth-child(3) > label > .cb1-element').uncheck() // unchecking checked checkbox
        cy.get(':nth-child(4) > label > .cb1-element').uncheck()

    }
    open_radioBox(){
        cy.get('.open > .dropdown-menu > :nth-child(3) > a').click()
    }
    checkRadioButton_1(){
        cy.get(':nth-child(4) > .panel-body').find('[type=radio]').then(radioButtons =>{
            for(let i=0;i<=1;i++){
            cy.wrap(radioButtons)
            .eq(i)
            .check()
            .should('be.checked')
            cy.get('#buttoncheck').click()
            // cy.screenshot()
            // cy.get('.radiobutton').should('contain','Radio button ')
    
            }
        })
    }
    checkRadioButton_2(){
        for(let j=0;j<=1;j++){
            cy.get(':nth-child(5) > .panel-body').find('[type=radio]').then(radioButtons =>{
                 cy.wrap(radioButtons)
                 .eq(j)
                 .check()
                 cy.get(':nth-child(5) > .panel-body > :nth-child(3)').find('[type=radio]').then(radioButtons =>{
                    // this.obj.radioB();
                    for(let i=0; i<=2;i++){
                     cy.wrap(radioButtons)
                     .eq(i)
                     .check()
                     .should('be.checked')
                     cy.get('.panel-body > .btn').click()
                    //  cy.screenshot()
                     //.should(be.Age group: list[i])
         
                     cy.get('.groupradiobutton').each((element,index,list) => {
         
                         expect(Cypress.$(element)).to.be.visible;
                     })
                 
                  }
                 })
             })
            }
         
    }
    open_table(){
        cy.get(':nth-child(1) > :nth-child(3) > .dropdown-toggle').click()
        cy.get('.open > .dropdown-menu > :nth-child(2) > a').click()
    }
    tableDemo(){
        for(let i=0; i<=3;i++) {
            cy.get('#task-table-filter').type(task[i])
            cy.get('.text-center > :nth-child(1) > .col-md-6 > :nth-child(2)').each(($el,
              index, $list) => {
                const txt = $el.text();
                if (txt.includes(task[i])){
                 
                  cy.get('.text-center > :nth-child(1) > .col-md-6 > :nth-child(2)')
                  .eq(index).then(function(desc){
                    const rsl = desc.text();
                   //assertion to verify the text
                   expect(rsl).to.contains(task[i]);
                //    cy.screenshot()
                   cy.get('#task-table-filter').clear()
                })
             }
            })
          }
    }

    open_alertBox(){
        cy.get('.navbar-right > :nth-child(2) > .dropdown-toggle').click()
        cy.get('.open > .dropdown-menu > :nth-child(5) > a').click()
    }

     click_alert(arg)
    {
        // cy.get(':nth-child(4) > .panel-body > .btn').click()
        cy.on('window:alert',function(alertText){
            expect(alertText).eq(arg)
        })
        cy.get(':nth-child(4) > .panel-body > .btn').click()
        
    }
    alertConfirm(arg1){
        cy.get(':nth-child(5) > .panel-body > .btn').click()
        cy.get('#confirm-demo').should('contain','You pressed OK!')
        
       
    }
    promptBoxAlert(){
        //  cy.get(':nth-child(6) > .panel-body > .btn').click()
        cy.window().then(function($win){
        cy.stub($win,'prompt').returns("welcome")
        cy.get(':nth-child(6) > .panel-body > .btn').click()
        // cy.get(':nth-child(6) > .panel-body').each(($el,
        //     index, $list) => {
        //       const txt = $el.text();
        //       if (txt.includes($el)){
        //         cy.get(':nth-child(6) > .panel-body')
        //         .eq(index).then(function(desc){
        //           const rsl = desc.text();
        //           expect(rsl).to.contains('welcome');
        //         })
        //     }
        // })

        cy.get(':nth-child(6) > .panel-body').should('contain','welcome')
        
       
    })
    }
}