package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="staffprofiles")
public class StaffProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="csi_staff_id")
	private String csiStaffId;
	
	@Column(name="staff_name")
	private String staffName;
	
	@Column(name="email")
	private String email;
	
	@Column(name="ic_number")
	private String icNumber;
	
	@Column(name="job_title")
	private String jobTitle; 
	
	@Column(name="mobile_no")
	private String mobileNo; 
	
	@Column(name="business_unit")
	private String businessUnit; 
	
	@Column(name="line_manager")
	private String lineManager; 
	
	@Column(name="join_date")
	private String joinDate; 
	
	public StaffProfile() {
		
	}
	
	public StaffProfile(String csiStaffId, String staffName, String email, String icNumber, String jobTitle,
			String mobileNo, String businessUnit, String lineManager, String joinDate) {
		this.csiStaffId = csiStaffId;
		this.staffName = staffName;
		this.email = email;
		this.icNumber = icNumber;
		this.jobTitle = jobTitle;
		this.mobileNo = mobileNo;
		this.businessUnit = businessUnit;
		this.lineManager = lineManager;
		this.joinDate = joinDate;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	
	public String getCsiStaffId() {
		return csiStaffId;
	}

	public void setCsiStaffId(String csiStaffId) {
		this.csiStaffId = csiStaffId;
	}

	public String getStaffName() {
		return staffName;
	}

	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getIcNumber() {
		return icNumber;
	}
	
	public void setIcNumber(String icNumber) {
		this.icNumber = icNumber;
	}
	
	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getBusinessUnit() {
		return businessUnit;
	}

	public void setBusinessUnit(String businessUnit) {
		this.businessUnit = businessUnit;
	}

	public String getLineManager() {
		return lineManager;
	}

	public void setLineManager(String lineManager) {
		this.lineManager = lineManager;
	}

	public String getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}



	@Override
	public String toString() {
		return "StaffProfile [id=" + id + ", csiStaffId=" + csiStaffId + ", staffName=" + staffName + ", email=" + email
				+ ", icNumber=" + icNumber + ", jobTitle=" + jobTitle + ", mobileNo=" + mobileNo + ", businessUnit="
				+ businessUnit + ", lineManager=" + lineManager + ", joinDate=" + joinDate + "]";
	}
	
}
