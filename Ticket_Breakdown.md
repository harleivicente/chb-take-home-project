# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


------------------------------------------
#1 Create new AgentCustomInfo table
------------------------------------------

In order to store custom labels for each agent we'll need a new table.

This table will allow us to assign a custom label/id to the pair (agent_id, facility_id). With that in mind, the table could look like this:

(id, facility_id, agent_id, custom_id)

Expected Outcome
    - Creating a table `AgentCustomInfo`
    - Add the necessary migration code to ensure automated creation of the table
    - Add Model classes for the entity `AgentCustomInfo`
    - Add repository to enable interaction with the table
    - Add the following index to the table to ensure good performance:
      - Non-clustered index by facility_id > agent_id 
    - Ensure unit/integration tests are added to the repository

Estimated Effort: 1 day


------------------------------------------
#2 - Create Agent Custom Label endpoints
------------------------------------------

In order to enable the feature will need to add a few endpoints that will power an interface that will allow a facility to customize the labels for certain Agents.

Expected Outcome
  - Create GET /agent-custom-info that would take as a parameter (i) facility ID and would return a list of all customizations for that facility, (ii) page size that defaults to 20, (iii) current page that defaults to 1.
  - Create PUT /agent-custom-info that would allow the item to edited
  - Create POST /agent-custom-info that would allow the creation of a new entry
  - Create DELETE /agent-custom-info that would allow an customization to be deleted
  - Add unit/integration tests to created services  

Estimated Effort: 2 day


------------------------------------------
#3 - Create Custom Agent Labels interface
------------------------------------------

Once #1 is complete we should be able to create an interface that will allow the custom labels to be assinged to agents.

Expected Outcome

- User can access the menu `Custom Agent Info` and view the form
- The form will list any existing customization performed by the facilty to each the logged user is associted
- An create button will present the user with a modal containing the following (i) dropdown that allows selecting an Agent, (i) an input that allows a custom label/ID to be inserted.
- Each item in the list can be edited through a similar modal to the item above
- Each entry can also be deleted
- The list should be paginated through a UI element at the end that allows:
  - selecting page size
  - selecting current page
- Add unit tests to the front-end

Estimated Effort: 1.5 day


------------------------------------------
#4 - Adjust the getShiftsByFacility service
------------------------------------------

Tickets #1 has added the ability to associate custom labels to Agents within the scope of a facility. In order to surface this information to the reports we'll need to tweak the 
method `getShiftsByFacility` so that it returns the custom 'IDs' set for each Agent as defined by the facilty.

Expected Outcome

    - Adjust the service so that it returns the custom label to each Agent as defined by the requesting facility. An suggested format would be:

    [
        {
            shiftId: 1,
            shiftDuration: 4.5,
            metadata: {
                internalAgentId: 45,
                agentLabel: 'Agent Steve'
            }
        },
        ...
    ]

Note: This information is to be fetched from the new table `AgentCustomInfo`

Estimated Effort: 0.5 day


------------------------------------------
#5 - Surface custom Agent labels
------------------------------------------

In ticket #3 we've added custom labels to each Agent as assigned by the Facility. This information is available
in the metadata object that is provided to the `generateReport` service under the field `agentLabel`.


Expected Outcome

    - Surface the custom label of each agent in the report
    - Adjust unit tests as needed to capture new behavior
    - Adjust any integration tests if necessary

Estimated Effort: 0.5 day


