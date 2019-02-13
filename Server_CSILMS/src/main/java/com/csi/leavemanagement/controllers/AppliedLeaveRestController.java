package com.csi.leavemanagement.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.models.AppliedLeave;
import com.csi.leavemanagement.security.CurrentUser;
import com.csi.leavemanagement.security.UserPrincipal;
import com.csi.leavemanagement.services.AppliedLeaveService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AppliedLeaveRestController {

	private AppliedLeaveService appliedLeaveService;

	@Autowired
	public AppliedLeaveRestController(AppliedLeaveService appliedLeaveService) {
		this.appliedLeaveService = appliedLeaveService;
	}
	
	@RequestMapping(value="/appliedleave", method=RequestMethod.GET)
	public List<AppliedLeave> doListAppliedLeave() {
		List<AppliedLeave> appliedLeave = this.appliedLeaveService.findAll();
		return appliedLeave;
	}

	@RequestMapping(value="/appliedleave", method=RequestMethod.POST)
	public AppliedLeave doSaveAppliedLeave(@RequestBody AppliedLeave appliedLeave) {
		AppliedLeave newAppliedLeave = this.appliedLeaveService.save(appliedLeave);
		return newAppliedLeave;
	}
	
	@RequestMapping(value="/appliedleave/{emplid}", method=RequestMethod.DELETE)
	public String doDeleteAppliedLeaveById(@PathVariable("emplid") String emplid,  
										   @RequestParam("effDate") String effDateStr, 
										   @RequestParam("startDate") String startDateStr,
										   @RequestParam("leavecode") String leaveCode) {
				
		// If both dates are not null, parse and create Date objects
		Date startDate = null, effDate = null;
		boolean dateValid = false;
		
		if(startDateStr != null && effDateStr != null) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
				
				startDate = sdf.parse(startDateStr);
				effDate = sdf.parse(effDateStr);
				dateValid = true;				
			} catch (Exception e) {
				dateValid = false;
			}
		}
		
		if(!dateValid)
			return "Unabled to Delete Applied leave";
		
		boolean result = this.appliedLeaveService.deleteById(emplid, effDate, startDate, leaveCode);
		if(!result)
			return "Unable to Delete Applied leave";
		
		return "Successfully Deleted Applied leave";
	}

	@RequestMapping(value="/appliedleave/{emplid}", method=RequestMethod.PATCH)
	public AppliedLeave doUpdateAppliedLeaveById(@PathVariable("emplid") String emplid,  
												 @RequestParam("effDate") String effDateStr, 
												 @RequestParam("startDate") String startDateStr,
												 @RequestParam("leavecode") String leaveCode,
												 @RequestBody AppliedLeave appliedLeave) {
		
		AppliedLeave newAppliedLeave = this.appliedLeaveService.save(appliedLeave);
		return newAppliedLeave;
	}

	@RequestMapping(value="/appliedleave/{emplid}/{effDate}/{startDate}/{leavecode}", method=RequestMethod.GET)
	public AppliedLeave doGetAppliedLeaveById(@PathVariable("emplid") String emplid,  
											  @PathVariable("effDate") String effDateStr, 
											  @PathVariable("startDate") String startDateStr,
											  @PathVariable("leavecode") String leaveCode) {
		
		// Try create Effective Date and Start Date from Path Variable
		Date startDate = null, effDate = null;
		boolean dateValid = false;
				
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
			
			startDate = sdf.parse(startDateStr);
			effDate = sdf.parse(effDateStr);
			dateValid = true;				
		} catch (Exception e) {
			dateValid = false;
		}
		
		if(dateValid) 
			return this.appliedLeaveService.findById(emplid, effDate, startDate, leaveCode);			
		else 
			return null;
	}
	
	@RequestMapping(value="/appliedleave/{emplid}", method=RequestMethod.GET)
	public List<AppliedLeave> doListAppliedLeaveByEmplid(@PathVariable("emplid") String emplid, 
													 	 @RequestParam(value="leaveCode", required=false) String leaveCode,
														 @RequestParam(value="leaveStatus", required=false) String leaveStatus,
													 	 @RequestParam(value="startDate", required=false) String startDateStr,
														 @RequestParam(value="endDate", required=false) String endDateStr) {
				
		// If both dates are not null, parse and create Date objects
		Date startDate = null, endDate = null;
		boolean datePresent = false;
		
		if(startDateStr != null && endDateStr != null) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
				
				startDate = sdf.parse(startDateStr);
				endDate = sdf.parse(endDateStr);
				datePresent = true;				
			} catch (Exception e) {
				datePresent = false;
			}
		}
		
		List<AppliedLeave> appliedLeave;
		
		// Call corresponding Service method base on PARAM provided
		if(leaveCode != null && leaveStatus != null && datePresent) {
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveCodeAndLeaveStatusAndBetweenDate
								(emplid, leaveCode, leaveStatus, startDate, endDate);
			
		} else if(leaveCode != null && leaveStatus != null && !datePresent) {
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveCodeAndLeaveStatus
								(emplid, leaveCode, leaveStatus);
		
		} else if(leaveCode != null && leaveStatus == null && datePresent) {
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveCodeBetweenDates
								(emplid, leaveCode, startDate, endDate);
			
		} else if(leaveCode != null && leaveStatus == null && !datePresent) { 				
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveCode
								(emplid, leaveCode);
		
		} else if(leaveCode == null && leaveStatus != null && datePresent) { 				
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveStatusBetweenDates
								(emplid, leaveStatus, startDate, endDate);
		
		} else if(leaveCode == null && leaveStatus != null && !datePresent) { 				
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveStatus
								(emplid, leaveStatus);
		
		} else if(leaveCode == null && leaveStatus == null && datePresent) { 				
			appliedLeave = this.appliedLeaveService.
								findByEmplidBetweenDates
								(emplid, startDate, endDate);
		
		} else //(leaveCode == null && leaveStatus == null && !datePresent) 
			appliedLeave = this.appliedLeaveService.findByEmplid(emplid);
		
		return appliedLeave;
	}
	
	@RequestMapping(value="/appliedleave/count/{emplid}", method=RequestMethod.GET)
	public long doCountAppliedLeaveByEmplid(@PathVariable("emplid") String emplid, 
											@RequestParam("leaveCode") String leaveCode) {
		long count = this.appliedLeaveService.countByEmplidAndLeaveCode(emplid, leaveCode);
		return count;
	}
	
	@RequestMapping(value="/appliedleave/count/{emplid}/{leaveCode}", method=RequestMethod.GET)
	public long doCountAppliedLeaveByEmplidB(@PathVariable("emplid") String emplid, 
											 @PathVariable("leaveCode") String leaveCode) {
		long count = this.appliedLeaveService.countByEmplidAndLeaveCode(emplid, leaveCode);
		return count;
	}	

	@RequestMapping(value="/appliedleave/count/{approver}/pendingApproval", method=RequestMethod.GET)
	public long doCountPendingApproverApproval(@PathVariable("approver") String approver) {
		long count = this.appliedLeaveService.countByApproverAndLeaveStatus(approver, "PNAPV");
		return count;
	}	

	@RequestMapping(value="/appliedleave/{approver}/pendingApproval", method=RequestMethod.GET)
	public List<AppliedLeave> doFindPendingApproverApproval(@PathVariable("approver") String approver) {
		List<AppliedLeave> appliedLeaveList = this.appliedLeaveService.findByApproverAndLeaveStatus(approver, "PNAPV");
		return appliedLeaveList;
	}
	
	@RequestMapping(value="/appliedleave/me", method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('EMPLOYEE')")
	public List<AppliedLeave> doGetMyAppliedLeaveByEmplid(@CurrentUser UserPrincipal currentUser, 
													 	 @RequestParam(value="leaveCode", required=false) String leaveCode,
														 @RequestParam(value="leaveStatus", required=false) String leaveStatus,
													 	 @RequestParam(value="startDate", required=false) String startDateStr,
														 @RequestParam(value="endDate", required=false) String endDateStr) {
				
		// If both dates are not null, parse and create Date objects
		Date startDate = null, endDate = null;
		boolean datePresent = false;
		
		if(startDateStr != null && endDateStr != null) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
				
				startDate = sdf.parse(startDateStr);
				endDate = sdf.parse(endDateStr);
				datePresent = true;				
			} catch (Exception e) {
				datePresent = false;
			}
		}
		
		String emplid = currentUser.getId();
		
		List<AppliedLeave> appliedLeave;
		
		// Call corresponding Service method base on PARAM provided
		if(leaveCode != null && leaveStatus != null && datePresent) {
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveCodeAndLeaveStatusAndBetweenDate
								(emplid, leaveCode, leaveStatus, startDate, endDate);
			
		} else if(leaveCode != null && leaveStatus != null && !datePresent) {
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveCodeAndLeaveStatus
								(emplid, leaveCode, leaveStatus);
		
		} else if(leaveCode != null && leaveStatus == null && datePresent) {
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveCodeBetweenDates
								(emplid, leaveCode, startDate, endDate);
			
		} else if(leaveCode != null && leaveStatus == null && !datePresent) { 				
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveCode
								(emplid, leaveCode);
		
		} else if(leaveCode == null && leaveStatus != null && datePresent) { 				
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveStatusBetweenDates
								(emplid, leaveStatus, startDate, endDate);
		
		} else if(leaveCode == null && leaveStatus != null && !datePresent) { 				
			appliedLeave = this.appliedLeaveService.
								findByEmplidAndLeaveStatus
								(emplid, leaveStatus);
		
		} else if(leaveCode == null && leaveStatus == null && datePresent) { 				
			appliedLeave = this.appliedLeaveService.
								findByEmplidBetweenDates
								(emplid, startDate, endDate);
		
		} else //(leaveCode == null && leaveStatus == null && !datePresent) 
			appliedLeave = this.appliedLeaveService.findByEmplid(emplid);
		
		return appliedLeave;
	}
}
