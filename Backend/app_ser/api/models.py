import mongoengine as me

class JobApplication(me.Document):
    company_name = me.StringField(required=True)
    position_title = me.StringField(required=True)
    application_date = me.DateTimeField(required=True)
    location = me.StringField()
    salary_expectation = me.IntField()
    status = me.StringField(
        choices=['APPLIED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'REJECTED', 'HIRED'], 
        required=True
    )
    job_description_link = me.URLField()
    
    meta = {'collection': 'job_applications'}
