import mongoengine as me
from datetime import datetime

class JobApplication(me.Document):
    owner_id = me.ObjectIdField(required=True)
    company_name = me.StringField(required=True)
    position_title = me.StringField(required=True)
    application_date = me.DateTimeField(required=True)
    location = me.StringField(required=True)
    salary_expectation = me.IntField(required=True)
    status = me.StringField(
        choices=[ 'SAVED','APPLIED', 'INTERVIEW_SCHEDULED','OFFER_RECEIVED', 'REJECTED', 'HIRED'], 
        default='SAVED',
        required=True
    )
    job_description_link = me.StringField(required=True)

    
    # Timestamp fields
    created_at = me.DateTimeField(default=datetime.utcnow)
    last_modified = me.DateTimeField(default=datetime.utcnow)
    
    meta = {'collection': 'job_applications'}

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = datetime.utcnow()
        self.last_modified = datetime.utcnow()
        return super(JobApplication, self).save(*args, **kwargs)
